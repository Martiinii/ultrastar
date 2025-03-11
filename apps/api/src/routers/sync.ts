import {
  getCoverImage,
  songGenerator,
} from "@ultrastar/ultrastar-api/src/lib/data";
import { eq } from "drizzle-orm";
import Elysia from "elysia";
import { readdir } from "node:fs/promises";
import { join } from "node:path";
import { db } from "../db";
import {
  languageTable,
  songTable,
  songToLanguageTable,
} from "../db/schema/songs";
import { setupPlugin } from "../plugins/setup";

export const syncRouter = new Elysia({
  prefix: "/sync",
  name: "sync",
  tags: ["Sync"],
})
  .use(setupPlugin)
  .post("/download/:page?", async function* ({ params: { page: pageStart } }) {
    let counter = 0;

    console.log("Start downloading songs metadata...");
    for await (const { page, totalPages } of songGenerator(
      pageStart ? Number(pageStart) : undefined
    )) {
      counter++;
      const { songs } = page;

      for (const song of songs) {
        try {
          db.transaction(async (tx) => {
            // Insert song without image
            const songRes = tx
              .insert(songTable)
              .values({
                apiId: song.apiId,
                title: song.title,
                artist: song.artist,
              })
              .onConflictDoNothing()
              .returning({ id: songTable.id })
              .get();

            if (!songRes) return;

            // If song didn't exist before, fetch image and update
            const imageData = await getCoverImage(song.apiId);
            await tx
              .update(songTable)
              .set({
                coverImage: imageData,
              })
              .where(eq(songTable.id, songRes.id));

            // Insert all languages
            await tx
              .insert(languageTable)
              .values(
                song.languages.map((l) => ({
                  language: l,
                }))
              )
              .onConflictDoNothing();

            // Find all languages from database that matches song
            const languagesRes = await tx.query.languageTable.findMany({
              where: (l, { inArray }) => inArray(l.language, song.languages),
            });

            // Connect languages to songs
            await tx
              .insert(songToLanguageTable)
              .values(
                languagesRes.map((l) => ({
                  languageId: l.id,
                  songId: songRes.id,
                }))
              )
              .onConflictDoNothing();
          });
        } catch (e) {
          console.warn(e);
          throw e;
        }
      }

      const progress = Math.floor((counter / totalPages) * 100);
      console.log(
        `Page ${counter} of ${totalPages} total pages | ${progress}%`
      );

      yield {
        currentPage: counter,
        totalPages,
        progress,
      };
    }

    console.log("🔥 Download complete");
  })
  .post("/sync-downloaded", async () => {
    const songsDirectory = "./songs";
    const downloadedSongs = new Set<string>();
    const allSongs = await readdir(songsDirectory);

    for (const song of allSongs) {
      try {
        const file = Bun.file(join(songsDirectory, song, "metadata.json"));
        const content = (await file.json()) as { id?: any };

        if (content.id && typeof content.id === "string") {
          downloadedSongs.add(content.id);
        }
      } catch {}
    }
    await db.transaction(async (tx) => {
      await tx.update(songTable).set({ downloadStatus: "available" });

      downloadedSongs.forEach(
        async (songId) =>
          await tx
            .update(songTable)
            .set({ downloadStatus: "complete" })
            .where(eq(songTable.id, songId))
      );
    });
  });
