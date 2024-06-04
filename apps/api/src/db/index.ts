import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import * as songsSchema from "./schema/songs";

const sqlite = new Database("db/sqlite.db");
export const db = drizzle(sqlite, {
  schema: {
    ...songsSchema,
  },
});
