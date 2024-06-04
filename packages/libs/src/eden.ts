import { treaty } from "@elysiajs/eden";
import type { App } from "@ultrastar/api";

export type Api = ReturnType<typeof treaty<App>>["api"];

export const constructApi = (
  url: string,
  config?: Parameters<typeof treaty>[1]
): Api => treaty<App>(url, config).api;
