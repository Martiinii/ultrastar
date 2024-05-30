/**
 * Parses all comments from given song
 * @param html HTML string from songPage
 * @returns Array of HTML strings with comments only
 */
export const parseComments = (html: string) => {
  return [
    ...html.matchAll(/<td>\d+\.\d+\.\d+ - \d+:\d+.*?<\/td>[\s\S]*?<\/td>/gm),
  ].map((m) => m[0]);
};
