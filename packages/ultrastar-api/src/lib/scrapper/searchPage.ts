import config from "../../config.json";
import { loggedFetcher } from "../login/login";

const LIMIT_PER_PAGE = 100;

/**
 * Generates form body for {@link scrapSearchPage}
 * @param page Page number to generate form body for
 * @returns Form data with order and limit & start generated based on given page
 */
const generateSearchFormBody = (page: number) => {
  const searchFormBody = new FormData();
  searchFormBody.set("order", "id");
  searchFormBody.set("ud", "asc");
  searchFormBody.set("limit", LIMIT_PER_PAGE.toString());
  searchFormBody.set("start", ((page - 1) * LIMIT_PER_PAGE).toString());

  return searchFormBody;
};

/**
 * Scrapes search page with table of songs
 * @param page Page number to scrap data for
 * @returns HTML
 */
export const scrapSearchPage = async (page: number) => {
  const url = `${config.apiUrl}/?link=list`;
  const searchFormBody = generateSearchFormBody(page);

  const response = await loggedFetcher(url, {
    method: "POST",
    body: searchFormBody,
  });
  const html = await response.text();

  return html;
};
