export const parseYoutubeLinks = (html: string) => {
  const links = [
    ...html.matchAll(
      /<td>(\d+\.\d+\.\d+) - (\d+:\d+).*$\s*.*?src="(.*?(?=youtu\.?be).*?)"/gm
    ),
  ]
    .map(parseYoutubeRegexMatch)
    .filter(Boolean);

  return links;
};

const parseYoutubeRegexMatch = (r: RegExpExecArray) => {
  const dateStr = r?.[1];
  const timeStr = r?.[2];
  const link = r?.[3];

  if (!dateStr || !timeStr || !link) return null;

  const [day, month, year] = dateStr.split(".") as [string, string, string];
  const [hour, minute] = timeStr.split(":") as [string, string];

  const date = new Date(`${month}.${day}.${year} ${hour}:${minute}`);

  return {
    createdAt: date,
    link,
  };
};
