/// <reference types="@ultrastar/types" />

import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { setupPlugin } from "./plugins/setup";
import { searchRouter } from "./routers/search";
import { songsRouter } from "./routers/songs";
import { syncRouter } from "./routers/sync";
import { wsRouter } from "./routers/ws";

export const app = new Elysia({
  prefix: "/api",
})
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
            description: "Search songs from local database",
          },
          { name: "Songs", description: "Download or modify existing songs" },
          {
            name: "Sync",
            description:
              "Perform actions to synchronize local database with https://usdb.animux.de/",
          },
        ],
      },
    })
  )
  .use(songsRouter)
  .use(searchRouter)
  .use(syncRouter)
  .use(wsRouter)
  .listen(3001);

console.log(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
