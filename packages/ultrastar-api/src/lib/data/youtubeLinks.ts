import { parseYoutubeLinks } from "../parser/parseYoutubeLinks";
import { scrapSongPage } from "../scrapper/songPage";

export const getYoutubeLinks = (html: string) => {
  return parseYoutubeLinks(html);
};
export const getYoutubeLinksById = async (id: number) => {
  const html = await scrapSongPage(id);
  return getYoutubeLinks(html);
};
