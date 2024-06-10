import { and, asc, count, eq, inArray, like, or, sql } from "drizzle-orm";
import { db } from "..";
import { languageTable, songTable, songToLanguageTable } from "../schema/songs";

const PAGE_SIZE = 100;
export const getSongs = async (
  page: number,
  search: string | undefined,
  languages: string[] | undefined
) => {
  const searchLikeString = search ? `%${search}%` : null;

  const filteredSongs = db.$with("filtered_songs").as(
    db
      .select({
        id: songTable.id,
        title: songTable.title,
        artist: songTable.artist,
        year: songTable.year,
        downloadStatus: songTable.downloadStatus,
        languages: sql<string>`GROUP_CONCAT(language.language)`.as("languages"),
      })
      .from(songToLanguageTable)
      .innerJoin(songTable, eq(songTable.id, songToLanguageTable.songId))
      .innerJoin(
        languageTable,
        eq(languageTable.id, songToLanguageTable.languageId)
      )
      .where(
        and(
          searchLikeString
            ? or(
                like(songTable.title, searchLikeString),
                like(songTable.artist, searchLikeString)
              )
            : undefined,
          languages?.length ? inArray(languageTable.id, languages) : undefined
        )
      )
      .groupBy(songTable.id)
  );

  const songs = db
    .with(filteredSongs)
    .select()
    .from(filteredSongs)
    .orderBy(asc(filteredSongs.title))
    .limit(PAGE_SIZE)
    .offset((page - 1) * PAGE_SIZE)
    .all();

  const totalCount = db
    .with(filteredSongs)
    .select({ count: count() })
    .from(filteredSongs)
    .get();

  const totalPages = Math.ceil((totalCount?.count ?? 0) / PAGE_SIZE);
  const res = {
    songs,
    totalPages,
  };

  return res;
};
