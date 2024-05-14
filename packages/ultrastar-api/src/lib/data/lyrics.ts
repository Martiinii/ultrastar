import { parseLyrics } from "../parser/parseLyrics";
import { scrapLyricsPage } from "../scrapper/lyricsPage";

export const getLyrics = (html: string) => {
  return parseLyrics(html);
};

export const getLyricsById = async (id: number) => {
  const html = await scrapLyricsPage(id);
  return getLyrics(html);
};
