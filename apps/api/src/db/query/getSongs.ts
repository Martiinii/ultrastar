import { count } from "drizzle-orm";
import { db } from "..";
import { songTable } from "../schema/songs";

const PAGE_SIZE = 10;
export const getSongs = async (page: number) => {
  const res = await db.transaction(async (tx) => {
    const songs = await tx.query.songTable.findMany({
      with: {
        songToLanguages: {
          with: {
            language: {
              columns: {
                language: true,
              },
            },
          },
          columns: {},
        },
      },
      columns: {
        coverImage: false,
      },
      orderBy: (t, { asc }) => asc(t.id),
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    });

    const totalCount = tx.select({ count: count() }).from(songTable).get();
    const totalPages = Math.ceil((totalCount?.count ?? 0) / PAGE_SIZE);

    return {
      songs: songs.map(({ songToLanguages, ...s }) => ({
        ...s,
        languages: songToLanguages.map((l) => l.language.language),
      })),
      totalPages,
    };
  });

  return res;
};
