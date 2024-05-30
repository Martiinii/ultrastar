import { parseLyrics } from "../parser/parseLyrics";
import { scrapLyricsPage } from "../scrapper/lyricsPage";

/**
 * Get lyrics from html
 * @param html HTML string from lyricsPage
 * @returns Object with lyrics, metadata and headers
 */
export const getLyrics = (html: string) => {
  return parseLyrics(html);
};

/**
 * Get lyrics from song id
 * @param id Song id
 * @returns Object with lyrics, metadata and headers
 */
export const getLyricsById = async (id: number) => {
  const html = await scrapLyricsPage(id);
  return getLyrics(html);
};
