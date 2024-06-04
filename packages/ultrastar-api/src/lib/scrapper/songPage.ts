import config from "../../config.json";

/**
 * Scrapes song page containing metadata and comments
 * @param id ID of song
 * @returns HTML
 */
export const scrapSongPage = async (id: number) => {
  const url = `${config.apiUrl}/?link=detail&id=${id}`;
  const response = await fetch(url);
  const html = await response.text();

  return html;
};
