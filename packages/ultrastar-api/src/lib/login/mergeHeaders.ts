import type { HeadersInit } from "undici-types";

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
