import { parseSongsFromSearch } from "../parser/parseSongsFromSearch";
import { scrapSearchPage } from "../scrapper/searchPage";

export const getAllSongs = async () => {
  const songs: Song[] = [];
  const firstPage = await getSongsFromPage(1);
  songs.push(...firstPage.songs);

  const totalPages = firstPage.totalPages;

  for (let i = 2; i < totalPages; i++) {
    const page = await getSongsFromPage(i);
    songs.push(...page.songs);
  }

  return songs;
};

export const getSongsFromPage = async (page: number) => {
  return parseSongsFromSearch(await scrapSearchPage(page));
};
