export const parseComments = (html: string) => {
  return [
    ...html.matchAll(/<td>\d+\.\d+\.\d+ - \d+:\d+.*?<\/td>[\s\S]*?<\/td>/gm),
  ].map((m) => m[0]);
};
