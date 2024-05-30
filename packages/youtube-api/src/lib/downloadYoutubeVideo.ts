import { $ } from "bun";

export const downloadYoutubeVideoFromLink = async (
  link: string,
  path: string
) => {
  await $`yt-dlp -S "ext,res:1080" -o '${path}' -- ${link}`.quiet();
};

export const downloadYoutubeVideo = async (
  video: YoutubeVideo,
  path: string
) => {
  await downloadYoutubeVideoFromLink(video.id, path);
};
