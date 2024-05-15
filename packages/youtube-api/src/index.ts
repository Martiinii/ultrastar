import { downloadYoutubeVideo } from "./lib/downloadYoutubeVideo";

const main = async () => {
  const link = "-tVWt2RDsoM";
  const path = "video.mp4";

  await downloadYoutubeVideo(link, path);
};

main();
