/**
 * Parse lyrics of a song
 * @param html HTML string from lyricsPage
 * @returns Full song object with headers, metadata and lyrics fields
 */
export const parseLyrics = (html: string) => {
  const text = html.match(/<textarea.*?>([\s\S]*)<\/textarea>/m)?.[1];
  if (!text) return null;

  const headersRaw = [...text.matchAll(/^#(.*:.*)$/gm)];
  const headers: SongHeaders = new Map();

  headersRaw.forEach((h) => {
    const [header, value] = h[1]?.split(":") ?? [];
    if (header && value)
      headers.set(header.toLowerCase() as SongHeaderType, value);
  });

  const metadata: Metadata = {
    artist: headers.get("artist") ?? "Unknown",
    title: headers.get("title") ?? "Unknown",
    year: headers.get("year") ?? "0",
    languages: headers.get("language")?.toLowerCase().split(", ") ?? [
      "unknown",
    ],
  };

  return {
    headers,
    metadata,
    lyrics: text.replaceAll(/^#.*:.*$[\n\r]+/gm, ""),
  };
};
