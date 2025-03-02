import { parseComments } from "./parseComments";

/**
 * Parses comments containing embedded youtube video links
 * @param html HTML string from songPage
 * @returns Comments that contain youtube video
 */
export const parseYoutubeLinks = (html: string) => {
  const comments = parseComments(html)
    .map((c) =>
      c.match(
        /<td>(\d+\.\d+\.\d+) - (\d+:\d+)[\s\S]*src="http(.*?(?=youtu\.?be).*?)"/m
      )
    )
    .map(parseYoutubeLinkFromComment)
    .filter(Boolean);

  return comments;
};

/**
 * Parses array of regex results into youtube link
 * @param r Array of regex results
 * @returns Object containing createdAt and link fields
 */
const parseYoutubeLinkFromComment = (
  r: RegExpMatchArray | null
): YoutubeLink | null => {
  const dateStr = r?.[1];
  const timeStr = r?.[2];
  const linkRaw = r?.[3];

  if (!dateStr || !timeStr || !linkRaw) return null;

  const [day, month, year] = dateStr.split(".") as [string, string, string];
  const [hour, minute] = timeStr.split(":") as [string, string];

  const date = new Date(`${month}.${day}.${year} ${hour}:${minute}`);

  const link = linkRaw.split("/").pop();
  if (!link) return null;

  return {
    createdAt: date,
    link,
  };
};
