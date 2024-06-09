import { getLyricsById } from "@ultrastar/ultrastar-api/src/lib/data";
import { count } from "drizzle-orm";
import Elysia, { t } from "elysia";
import { db } from "../db";
import { getSongs } from "../db/query/getSongs";
import { songTable } from "../db/schema/songs";
import { setupPlugin } from "../plugins/setup";

export const searchRouter = new Elysia({
  prefix: "/search",
  name: "search",
  tags: ["Search"],
})
  .use(setupPlugin)
  .get(
    "/:page",
    async ({ params: { page }, query: { search, languages } }) =>
      getSongs(page, search, languages ? languages.split(",") : []),
    {
      params: t.Object({
        page: t.Numeric(),
      }),
      query: t.Object({
        search: t.Optional(t.String()),
        languages: t.Optional(t.String()),
      }),
    }
  )
  .get(
    "/id/:id",
    ({ params: { id } }) => {
      return getLyricsById(id);
    },
    {
      params: t.Object({
        id: t.Numeric(),
      }),
    }
  )
  .get("/count", () => {
    const res = db.select({ count: count() }).from(songTable).get();
    return res?.count ?? 0;
  });
