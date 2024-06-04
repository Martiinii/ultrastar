import config from "../../config.json";
import { loggedFetcher } from "../login/login";

/**
 * Scrapes lyrics page of song
 * @param id ID of song
 * @returns HTML
 */
export const scrapLyricsPage = async (id: number) => {
  const url = `${config.apiUrl}/?link=editsongs&id=${id}`;
  const response = await loggedFetcher(url);
  const html = await response.text();

  return html;
};
