import Elysia from "elysia";
import { db } from "../db";
import { setupPlugin } from "../plugins/setup";

export const languagesRouter = new Elysia({
  prefix: "/languages",
  name: "languages",
  tags: ["Languages"],
})
  .use(setupPlugin)
  .get(
    "/",
    async () =>
      await db.query.languageTable.findMany({
        orderBy: ({ language }, { asc }) => asc(language),
      })
  );
