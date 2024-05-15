import { parseComments } from "./parseComments";

export const parseYoutubeLinks = (html: string) => {
  const comments = parseComments(html)
    .map((c) =>
      c.match(
        /<td>(\d+\.\d+\.\d+) - (\d+:\d+)[\s\S]*src="(.*?(?=youtu\.?be).*?)"/m
      )
    )
    .map(parseYoutubeLinkFromComment)
    .filter(Boolean);

  return comments;
};

const parseYoutubeLinkFromComment = (r: RegExpMatchArray | null) => {
  const dateStr = r?.[1];
  const timeStr = r?.[2];
  const linkRaw = r?.[3];

  if (!dateStr || !timeStr || !linkRaw) return null;

  const [day, month, year] = dateStr.split(".") as [string, string, string];
  const [hour, minute] = timeStr.split(":") as [string, string];

  console.log({ day, month, year, hour, minute });

  const date = new Date(`${month}.${day}.${year} ${hour}:${minute}`);

  const link = linkRaw.split("/").pop();

  return {
    createdAt: date,
    link,
  };
};
