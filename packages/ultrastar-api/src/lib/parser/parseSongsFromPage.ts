import { parseSongFromTable } from "./parseSongFromTable";

export const parseSongsFromPage = (page: string): Page => {
  const totalPages = Number.parseInt(
    page.match(/<br>There are\s+\d+\s+results? on\s+(\d+)\s+page/)?.[1] ?? "0"
  );

  const songsHtml = [
    ...page.matchAll(/<tr class="list_tr[12].*?>\s*([\s\S]*?)\s*<\/tr>/gm),
  ];

  const songs = songsHtml
    .map((s) => parseSongFromTable(s?.[1]))
    .filter((s) => s != null);

  return {
    totalPages,
    songs,
  };
};
