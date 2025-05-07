"use client";
import { constructApi, type Api } from "@ultrastar/libs";

export const clientApi = (): Api => {
  if (window === undefined) return null!;

  const url = `http://${new URL(window.location.href).hostname}:3001`;
  return constructApi(url);
};
