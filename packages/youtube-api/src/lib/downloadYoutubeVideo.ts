import { $ } from "bun";

export const downloadYoutubeVideo = async (link: string, path: string) => {
  await $`yt-dlp -S "ext,res:1080" -o '${path}' -- ${link}`.quiet();
};
