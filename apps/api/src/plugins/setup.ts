import Elysia from "elysia";

export const setupPlugin = new Elysia({ name: "setup" }).onBeforeHandle(
  { as: "global" },
  ({ request }) => {
    const path = new URL(request.url).pathname;
    const log = `${request.method} ${path}`;

    console.log(log);
  }
);
