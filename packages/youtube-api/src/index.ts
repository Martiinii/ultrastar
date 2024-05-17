import { searchYoutube } from "./lib/searchYoutube";

const main = async () => {
  //   const link = "-tVWt2RDsoM";
  //   const path = "video.mp4";
  //   await downloadYoutubeVideo(link, path);

  const res = await searchYoutube("Dua Lipa - Illusion");
  Bun.write("data.json", JSON.stringify(res));
};

main();
