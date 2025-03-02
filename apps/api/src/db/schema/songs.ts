import { createId } from "@paralleldrive/cuid2";
import { relations } from "drizzle-orm";
import {
    blob,
    integer,
    primaryKey,
    sqliteTable,
    text,
} from "drizzle-orm/sqlite-core";

export const songTable = sqliteTable("song", {
  id: text("id").primaryKey().$defaultFn(createId),
  apiId: integer("api_id").unique().notNull(),
  artist: text("artist").notNull(),
  year: integer("year"),
  title: text("title").notNull(),
  coverImage: blob("image").$type<Uint8Array>(),
  downloadStatus: text("download_status", {
    enum: ["available", "loading", "complete"],
  })
    .notNull()
    .default("available"),
});
export const songRelations = relations(songTable, ({ many }) => ({
  songToLanguages: many(songToLanguageTable),
  songToVideos: many(songToVideoTable),
}));

export const songToLanguageTable = sqliteTable(
  "song_language",
  {
    songId: text("song_id")
      .notNull()
      .references(() => songTable.id),
    languageId: text("language_id")
      .notNull()
      .references(() => languageTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.songId, t.languageId] }),
  })
);
export const songToLanguageRelations = relations(
  songToLanguageTable,
  ({ one }) => ({
    song: one(songTable, {
      fields: [songToLanguageTable.songId],
      references: [songTable.id],
    }),
    language: one(languageTable, {
      fields: [songToLanguageTable.languageId],
      references: [languageTable.id],
    }),
  })
);

export const songToVideoTable = sqliteTable(
  "song_video",
  {
    songId: text("song_id")
      .notNull()
      .references(() => songTable.id),
    videoId: text("video_id")
      .notNull()
      .references(() => videoTable.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.songId, t.videoId] }),
  })
);
export const songToVideoRelations = relations(songToVideoTable, ({ one }) => ({
  song: one(songTable, {
    fields: [songToVideoTable.songId],
    references: [songTable.id],
  }),
  language: one(videoTable, {
    fields: [songToVideoTable.videoId],
    references: [videoTable.id],
  }),
}));

export const languageTable = sqliteTable("language", {
  id: text("id").primaryKey().$defaultFn(createId),
  language: text("language").unique().notNull(),
});
export const languageRelations = relations(languageTable, ({ many }) => ({
  languageToSongs: many(songToLanguageTable),
}));

export const videoTable = sqliteTable("video", {
  id: text("id").primaryKey().$defaultFn(createId),
  videoLink: text("video_link").notNull(),
});
export const videoRelations = relations(videoTable, ({ many }) => ({
  videosToSongs: many(songToVideoTable),
}));
