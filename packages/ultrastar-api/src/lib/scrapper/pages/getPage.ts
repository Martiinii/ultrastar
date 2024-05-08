import config from "@/config.json";
import { loggedFetcher } from "../../login/login";
import { parseSongsFromPage } from "../../parser/parseSongsFromPage";

const pagesUrl = `${config.apiUrl}/?link=list`;

const limitPerPage = 100;

const generatePageFormBody = (page: number) => {
  const pageFormBody = new FormData();
  pageFormBody.set("order", "id");
  pageFormBody.set("ud", "asc");
  pageFormBody.set("limit", limitPerPage);
  pageFormBody.set("start", (page - 1) * limitPerPage);

  return pageFormBody;
};

export const getPage = async (page: number) => {
  const pageFormBody = generatePageFormBody(page);

  const response = await loggedFetcher(pagesUrl, {
    method: "POST",
    body: pageFormBody,
  });

  const html = await response.text();
  const data = parseSongsFromPage(html);

  return data;
};
