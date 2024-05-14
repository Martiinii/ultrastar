import { getYoutubeLinksById } from "./lib/data/youtubeLinks";
import { refreshLoginCookie } from "./lib/login/login";

await refreshLoginCookie();

const main = async () => {
  const links = await getYoutubeLinksById(22115);

  console.log(links);
};

main();
