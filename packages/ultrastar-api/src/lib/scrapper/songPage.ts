import config from "@/config.json";

export const scrapSongPage = async (id: number) => {
  const url = `${config.apiUrl}/?link=detail&id=${id}`;
  const response = await fetch(url);
  const html = await response.text();

  return html;
};
