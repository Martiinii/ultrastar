import { constructApi, type Api } from "@ultrastar/libs";

export const api: Api = constructApi("localhost:3000");

export const clientApi: Api = constructApi("", {
  keepDomain: true,
});
