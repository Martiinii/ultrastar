import { getLyricsById } from "@ultrastar/ultrastar-api/src/lib/data";
import Elysia, { t } from "elysia";
import { setupPlugin } from "../plugins/setup";

export const searchRouter = new Elysia({
  prefix: "/search",
  name: "search",
  tags: ["Search"],
})
  .use(setupPlugin)
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
  .get("/filters/:filter", "");
