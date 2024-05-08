import config from "@/config.json";
import { loggedFetcher } from "../../login/login";
import { parseLyrics } from "../../parser/parseLyrics";

export const getLyrics = async (id: number) => {
  const url = `${config.apiUrl}/?link=editsongs&id=${id}`;

  const response = await loggedFetcher(url);
  const html = await response.text();

  const text = html.match(/<textarea.*?>([\s\S]*)<\/textarea>/m)?.[1];
  if (!text) return null;

  return parseLyrics(text);
};
