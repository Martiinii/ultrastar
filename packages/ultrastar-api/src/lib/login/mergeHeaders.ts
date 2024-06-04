/**
 * Utility function to merge multiple objects with headers into one
 * @param headersInits Spreaded array of headers
 * @returns Merged headers
 */
export const mergeHeaders = (
  ...headersInits: (ConstructorParameters<typeof Headers>["0"] | undefined)[]
) => {
  let result: { [k: string]: string } = {};

  headersInits.forEach((init) => {
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
