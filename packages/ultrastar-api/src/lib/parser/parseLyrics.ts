export const parseLyrics = (text: string) => {
  const headersRaw = [...text.matchAll(/^#(.*:.*)$/gm)];
  const headers: SongHeaders = new Map();

  headersRaw.forEach((h) => {
    const [header, value] = h[1]?.split(":") ?? [];
    if (header && value)
      headers.set(header.toLowerCase() as SongHeaderType, value);
  });

  const metadata: Metadata = {
    artist: headers.get("artist"),
    title: headers.get("title"),
    year: headers.get("year"),
    language: headers.get("language"),
  };

  return {
    headers,
    metadata,
    lyrics: text.replaceAll(/^#.*:.*$[\n\r]+/gm, ""),
  };
};
