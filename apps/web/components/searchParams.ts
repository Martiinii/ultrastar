import { createSearchParamsCache, createSerializer, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server";

export const searchParams = {
    page: parseAsInteger.withDefault(1),
    search: parseAsString.withDefault(""),
    languages: parseAsArrayOf(parseAsString).withDefault([])
}

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams)