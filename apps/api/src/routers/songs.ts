import {
  getLyricsById,
  getYoutubeLinksById,
} from "@ultrastar/ultrastar-api/src/lib/data";
import {
  downloadYoutubeVideoFromLink,
  searchYoutube,
} from "@ultrastar/youtube-api";
import Elysia, { t } from "elysia";
import { setupPlugin } from "../plugins/setup";

export const songsRouter = new Elysia({
  prefix: "/songs",
  name: "songs",
  tags: ["Songs"],
})
  .use(setupPlugin)
  .get("/", "")
  .get(
    "/:id/download",
    async ({ params: { id }, error }) => {
      const song = await getLyricsById(id);
      if (!song) return error(400, "Song not found");

      const youtubeVideos = await getYoutubeLinksById(id);

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

      await downloadYoutubeVideoFromLink(youtubeLink, "video.mp4");
      return "Complete!";
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  );
