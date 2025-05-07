"use client";

import { clientApi } from "@/lib/client-api";
import { useSongsStore } from "@/store/useSongsStore";
import { IconButton } from "@ui/components/icon-button";
import { Download, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import type { SongCardProps } from "../song-card";
import {
  SONG_STARTED_DOWNLOADING,
  generateTitleByArtist,
} from "../utils/toastTitles";

export const DownloadButton = ({
  id,
  title,
  artist,
  downloadStatus,
}: SongCardProps) => {
  const songsStore = useSongsStore();
  const buttonState = songsStore.songs.get(id);

  const downloadClick = async () => {
    const description = generateTitleByArtist(title, artist);

    toast.loading(SONG_STARTED_DOWNLOADING, { description, id });
    songsStore.addDownloading(id);

    const res = await clientApi().songs({ id }).download.get();

    if (res.error) {
      if (res.error.status === 409) {
        songsStore.completeDownload(id);
      } else {
        songsStore.removeDownloading(id);
      }

      return toast.error(
        typeof res.error.value === "string"
          ? res.error.value
          : "Unknown error occured",
        {
          id,
          description: null,
        }
      );
    }
  };

  let buttonText: string;
  let icon: LucideIcon | null = null;

  switch (buttonState) {
    case "loading":
      buttonText = "Downloading";
      break;
    default:
      buttonText = "Download";
      icon = Download;
  }

  return (
    <IconButton
      className="w-full"
      icon={{ icon }}
      onClick={downloadClick}
      isLoading={buttonState === "loading" || downloadStatus === "loading"}
    >
      {buttonText}
    </IconButton>
  );
};
