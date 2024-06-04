/**
 * Converts Map to Object with correct types
 * @param map Map to convert
 * @returns Typesafe
 */
export const mapToObject = <K extends string, V>(map: Map<K, V>) =>
  Object.fromEntries(map) as { [k in K]?: V };
