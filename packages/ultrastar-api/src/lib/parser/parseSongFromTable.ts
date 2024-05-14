export const parseSongFromTable = (html: string | undefined): Song | null => {
  if (!html) return null;

  const songId = Number.parseInt(
    html.match(/show_detail\((\d+)\)/)?.[1] ?? "-1"
  );
  const songMetadata = [
    ...html.matchAll(/<td\s+.*?>(?:<a.*?>)?(.*)<\/td>/gm),
  ].map((m) => m?.[1]);

  const artist = songMetadata?.[0];
  const title = songMetadata?.[1];
  const languages = songMetadata?.[4]?.toLowerCase().split(", ");

  if (!songId || !artist || !title || !languages) return null;

  return {
    id: songId,
    artist,
    title,
    languages,
  };
};
