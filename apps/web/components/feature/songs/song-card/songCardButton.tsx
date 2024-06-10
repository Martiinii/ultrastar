"use client";

import { useSongsStore } from "@/store/useSongsStore";
import type { SongCardProps } from ".";
import { ChangeVideoButton } from "../buttons/changeVideoButton";
import { DownloadButton } from "../buttons/downloadButton";

export const SongCardButton = (props: SongCardProps) => {
  const songsStore = useSongsStore();
  const buttonState = songsStore.songs.get(props.id);

  if (props.downloadStatus === "complete" || buttonState === "complete")
    return <ChangeVideoButton {...props} />;

  return <DownloadButton {...props} />;
};
