"use client";

import { useSongsStore } from "@/store/useSongsStore";
import type { SongCardProps } from ".";
import { ChangeVideoButton } from "./changeVideoButton";
import { DownloadButton } from "./downloadButton";

export const SongCardButton = (props: SongCardProps) => {
  const songsStore = useSongsStore();
  const buttonState = songsStore.songs.get(props.id);

  if (props.isDownloaded || buttonState === "complete")
    return <ChangeVideoButton {...props} />;

  return <DownloadButton {...props} />;
};
