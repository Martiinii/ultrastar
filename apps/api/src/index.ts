/// <reference types="@ultrastar/types" />

import swagger from "@elysiajs/swagger";
import { refreshLoginCookie } from "@ultrastar/ultrastar-api/src/lib/login/login";
import { Elysia } from "elysia";
import { setupPlugin } from "./plugins/setup";
import { searchRouter } from "./routers/search";
import { songsRouter } from "./routers/songs";

await refreshLoginCookie();

const app = new Elysia()
  .use(setupPlugin)
  .use(
    swagger({
      documentation: {
        info: {
          title: "UltraStar API Documentation",
          version: "1.0.0",
        },
        tags: [
          {
            name: "Search",
            description:
              "Search songs from https://usdb.animux.de/ with @ultrastar/ultrastar-api",
          },
          { name: "Songs", description: "Manage songs in local filesystem" },
        ],
      },
    })
  )
  .use(songsRouter)
  .use(searchRouter)
  .listen(3001);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
