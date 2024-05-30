import type { HeadersInit } from "undici-types";

/**
 * Utility function to merge multiple objects with headers into one
 * @param headersInits Spreaded array of headers
 * @returns Merged headers
 */
export const mergeHeaders = (...headersInits: (HeadersInit | undefined)[]) => {
  let result: { [k: string]: string } = {};

  headersInits.forEach((init: HeadersInit | undefined) => {
    if (!init) return;

    new Headers(init).forEach((value, key) => {
      if (value === "null" || value === "undefined") {
        delete result[key];
      } else {
        result[key] = value;
      }
    });
  });

  return result;
};
