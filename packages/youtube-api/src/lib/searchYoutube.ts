import { $ } from "bun";

export const searchYoutube = async (search: string) => {
  const response =
    await $`yt-dlp --match-filters 'original_url!*=/shorts/'   "ytsearch5:${search}" --flat-playlist -j --no-simulate`.text();

  return JSON.parse(
    `[${response.split("\n").filter(Boolean).join(",")}]`
  ) as YoutubeVideo[];
};
