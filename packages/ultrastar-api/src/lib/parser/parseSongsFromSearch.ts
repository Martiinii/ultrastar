import { parseSongFromTable } from "./parseSongFromTable";

/**
 * Parse songs from search result as page
 * @param html HTML string from searchPage
 * @returns Page object with totalPages and songs fields
 */
export const parseSongsFromSearch = (html: string): Page => {
  const totalPages = Number.parseInt(
    html.match(/<br>There are\s+\d+\s+results? on\s+(\d+)\s+page/)?.[1] ?? "0"
  );

  const songsHtml = [
    ...html.matchAll(/<tr class="list_tr[12].*?>\s*([\s\S]*?)\s*<\/tr>/gm),
  ];
  const songs = songsHtml
    .map((s) => parseSongFromTable(s?.[1]))
    .filter(Boolean);

  return {
    totalPages,
    songs,
  };
};
