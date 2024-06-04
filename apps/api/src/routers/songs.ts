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
import { mkdir } from "node:fs/promises";
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
    if (!song.coverImage) return error(404, "Image not found");

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
        isDownloaded: true,
        title: true,
        artist: true,
        coverImage: true,
      },
    });

    if (!dbSong) return error(400, "Song not found in database");
    if (dbSong.isDownloaded) return error(409, "Song is already downloaded");

    const song = await getLyricsById(dbSong.apiId);
    if (!song) return error(400, "Song not found");

    const messageData = {
      songId: id,
      artist: dbSong.artist,
      title: dbSong.title,
    };

    // Broadcast WS message that this song is now being downloaded
    publishMessage({
      status: "loading",
      ...messageData,
    });

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

    // Write lyrics and headers to file
    const songDirectoryName = `${dbSong.artist} - ${dbSong.title}`;
    const songDirectoryPath = join("./songs", songDirectoryName);

    // Create directory
    await mkdir(songDirectoryPath, { recursive: true });

    song.headers.mp3 = "video.mp4";
    song.headers.video = "video.mp4";
    song.headers.cover = "cover.jpg";

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

    // Download Youtube video
    await downloadYoutubeVideoFromLink(
      youtubeLink,
      join(songDirectoryPath, "video.mp4")
    );

    // Update song in database
    await db
      .update(songTable)
      .set({
        isDownloaded: true,
      })
      .where(eq(songTable.id, id));

    publishMessage({
      status: "complete",
      ...messageData,
    });

    return;
  });
