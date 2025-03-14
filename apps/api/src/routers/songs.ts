import {
  getLyricsById,
  getYoutubeLinksById,
} from "@ultrastar/ultrastar-api/src/lib/data";
import {
  downloadYoutubeVideoFromLink,
  searchYoutube,
} from "@ultrastar/youtube-api";
import { eq } from "drizzle-orm";
import Elysia from "elysia";
import { mkdir, rm } from "node:fs/promises";
import { join } from "node:path";
import { db } from "../db";
import { songTable } from "../db/schema/songs";
import { setupPlugin } from "../plugins/setup";
import { publishMessage } from "./ws";

export const songsRouter = new Elysia({
  prefix: "/songs",
  name: "songs",
  tags: ["Songs"],
})
  .use(setupPlugin)
  .get("/:id/cover", async ({ params: { id }, error }) => {
    const song = await db.query.songTable.findFirst({
      where: (t, { eq }) => eq(t.id, id),
      columns: {
        coverImage: true,
      },
    });
    if (!song) return error(404, "Song not found");
    if (!song.coverImage)
      return new Response(Bun.file("assets/cover_not_found.jpg"));

    return new Response(song.coverImage, {
      headers: {
        "Content-Type": "image/jpeg",
      },
    });
  })
  .get("/:id/download", async ({ params: { id }, error }) => {
    // Find song in database
    const dbSong = await db.query.songTable.findFirst({
      where: (t, { eq }) => eq(t.id, id),
      columns: {
        apiId: true,
        downloadStatus: true,
        title: true,
        artist: true,
        coverImage: true,
      },
    });

    if (!dbSong) return error(400, "Song not found in database");
    if (dbSong.downloadStatus === "loading")
      return error(409, "Song is already being downloaded");
    if (dbSong.downloadStatus === "complete")
      return error(409, "Song is already downloaded");

    const song = await getLyricsById(dbSong.apiId);
    if (!song) return error(400, "Song not found");

    const messageData = {
      songId: id,
      artist: dbSong.artist,
      title: dbSong.title,
    };

    const songDirectoryName = `${dbSong.artist} - ${dbSong.title}`;
    const songDirectoryPath = join("./songs", songDirectoryName);

    try {
      // Broadcast WS message that this song is now being downloaded
      publishMessage({
        status: "loading",
        ...messageData,
      });

      // Update song in database
      await db
        .update(songTable)
        .set({
          downloadStatus: "loading",
        })
        .where(eq(songTable.id, id));

      // Get link to Youtube video
      const youtubeVideos = await getYoutubeLinksById(dbSong.apiId);

      let youtubeLink: string;

      if (youtubeVideos.length == 0) {
        const searchResult = await searchYoutube(
          `${song.metadata.artist} - ${song.metadata.title}`
        );
        if (searchResult.length == 0) return error(400, "No videos found");

        youtubeLink = searchResult[0]!.id;
      } else {
        youtubeLink = youtubeVideos[0]!.link;
      }

      // Create directory
      await mkdir(songDirectoryPath, { recursive: true });

      song.headers.mp3 = "video.mp4";
      song.headers.video = "video.mp4";
      song.headers.cover = "cover.jpg";

      // Write lyrics and headers to file
      const lyricsFile = Bun.file(join(songDirectoryPath, "song.txt"));
      const writer = lyricsFile.writer();
      Object.entries(song.headers).forEach(([k, v]) => {
        writer.write(`#${k.toUpperCase()}:${v}\n`);
      });

      writer.write(song.lyrics);
      writer.end();

      // Write cover image data to file
      await Bun.write(
        join(songDirectoryPath, "cover.jpg"),
        dbSong.coverImage ?? ""
      );

      // Write metadata to file
      await Bun.write(
        join(songDirectoryPath, "metadata.json"),
        JSON.stringify({ id })
      );

      // We don't wait for video to fully download before we response
      (async () => {
        try {
          // Download Youtube video
          await downloadYoutubeVideoFromLink(
            youtubeLink,
            join(songDirectoryPath, "video.mp4")
          );

          // Update song in database
          await db
            .update(songTable)
            .set({
              downloadStatus: "complete",
            })
            .where(eq(songTable.id, id));

          publishMessage({
            status: "complete",
            ...messageData,
          });
        } catch (e) {
          await db
            .update(songTable)
            .set({
              downloadStatus: "available",
            })
            .where(eq(songTable.id, id));

          await rm(songDirectoryPath, { recursive: true, force: true });
          console.log(e);
          publishMessage({
            status: "error",
            ...messageData,
          });
        }
      })();

      // Early respond before video is downloaded to avoid ECONNREFUSED error from Next.js proxy
      return "Downloading...";
    } catch (e) {
      // Revert song and remove all associated files
      await db
        .update(songTable)
        .set({
          downloadStatus: "available",
        })
        .where(eq(songTable.id, id));

      await rm(songDirectoryPath, { recursive: true, force: true });

      return error(500, "An error occured while downloading this song");
    }
  });
