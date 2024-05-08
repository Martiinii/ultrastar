import { getPage } from "./pages/getPage";

export const getAllSongs = async () => {
  const songs: Song[] = [];
  const firstPage = await getPage(1);
  songs.push(...firstPage.songs);

  const totalPages = firstPage.totalPages;

  for (let i = 2; i < totalPages; i++) {
    const page = await getPage(i);
    songs.push(...page.songs);
  }

  return songs;
};
