import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "libsql";
import * as songsSchema from "./schema/songs";

const sqlite = new Database("db/sqlite.db");
export const db = drizzle(sqlite, {
  schema: {
    ...songsSchema,
  },
});
