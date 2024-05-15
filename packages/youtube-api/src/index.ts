import { downloadYoutubeVideo } from "./lib/downloadYoutubeVideo";

const main = async () => {
  const link = "a9cyG_yfh1k";
  const path = "video.mp4";

  await downloadYoutubeVideo(link, path);
};

main();
