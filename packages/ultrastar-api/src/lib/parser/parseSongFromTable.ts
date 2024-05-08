export const parseSongFromTable = (song: string | undefined): Song | null => {
  if (!song) return null;

  const songId = song.match(/show_detail\((\d+)\)/)?.[1];
  const songMetadata = [
    ...song.matchAll(/<td\s+.*?>(?:<a.*?>)?(.*)<\/td>/gm),
  ].map((m) => m?.[1]);

  const artist = songMetadata?.[0];
  const title = songMetadata?.[1];
  const language = songMetadata?.[4];

  if (!songId || !artist || !title || !language) return null;

  return {
    id: songId,
    artist,
    title,
    language,
  };
};
