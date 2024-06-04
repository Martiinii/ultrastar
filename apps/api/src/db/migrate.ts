import { Database } from "bun:sqlite";
import { drizzle } from "drizzle-orm/bun-sqlite";
import { migrate } from "drizzle-orm/bun-sqlite/migrator";

const runMigrate = async () => {
  const sqlite = new Database("sqlite.db");
  const db = drizzle(sqlite);

  console.log("⏳ Running migrations...");

  const start = Date.now();

  migrate(db, { migrationsFolder: "src/db/migrations" });

  const end = Date.now();

  console.log("✅ Migrations completed in", end - start, "ms");

  process.exit(0);
};

runMigrate().catch((err) => {
  console.error("❌ Migration failed");
  console.error(err);
  process.exit(1);
});
