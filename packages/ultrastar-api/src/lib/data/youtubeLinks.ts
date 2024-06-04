import { parseYoutubeLinks } from "../parser/parseYoutubeLinks";
import { scrapSongPage } from "../scrapper/songPage";

/**
 * Gets all youtube links from comments for provided song
 * @param html HTML string from songPage
 * @returns Array of objects with createdAt and link fields
 */
export const getYoutubeLinks = (html: string) => {
  return parseYoutubeLinks(html);
};

/**
 * Gets all youtube links from comments for provided song
 * @param id Song id
 * @returns Array of objects with createdAt and link fields
 */
export const getYoutubeLinksById = async (id: number) => {
  const html = await scrapSongPage(id);
  return getYoutubeLinks(html);
};
