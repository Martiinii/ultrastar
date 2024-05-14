import config from "@/config.json";
import { loggedFetcher } from "../login/login";

const LIMIT_PER_PAGE = 100;

const generateSearchFormBody = (page: number) => {
  const searchFormBody = new FormData();
  searchFormBody.set("order", "id");
  searchFormBody.set("ud", "asc");
  searchFormBody.set("limit", LIMIT_PER_PAGE);
  searchFormBody.set("start", (page - 1) * LIMIT_PER_PAGE);

  return searchFormBody;
};

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
