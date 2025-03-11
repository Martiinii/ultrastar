import { parseSongsFromSearch } from "../parser/parseSongsFromSearch";
import { scrapSearchPage } from "../scrapper/searchPage";

/**
 * Song generator from searchPage
 * @yields Every page with songs
 */
export const songGenerator = async function* (initialPage = 1) {
  const firstPage = await getSongsFromPage(initialPage);
  const totalPages = firstPage.totalPages;

  yield { page: firstPage, totalPages };

  for (let i = initialPage + 1; i <= totalPages; i++) {
    const page = await getSongsFromPage(i);
    yield { page, totalPages };
  }
};

/**
 * Gets all songs from page
 * @param page Page number
 * @returns Page object
 */
export const getSongsFromPage = async (page: number) => {
  return parseSongsFromSearch(await scrapSearchPage(page));
};
