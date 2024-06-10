"use client";

import { clientApi } from "@/lib/api";
import { useSongsStore } from "@/store/useSongsStore";
import { memo, useEffect } from "react";
import { toast } from "sonner";
import {
  SONG_DOWNLOADED,
  SONG_ERROR,
  generateTitleByArtist,
} from "./feature/songs/utils/toastTitles";

export const WebSocketListener = memo(() => {
  const songsStore = useSongsStore();

  useEffect(() => {
    const ws = clientApi.ws.index.subscribe();

    ws.subscribe(({ data }) => {
      switch (data.status) {
        case "complete":
          songsStore.completeDownload(data.songId);
          return toast.success(SONG_DOWNLOADED, {
            id: data.songId,
            description: generateTitleByArtist(data.title, data.artist),
          });
        case "loading":
          return songsStore.addDownloading(data.songId);
        case "error":
          songsStore.removeDownloading(data.songId);
          return toast.error(SONG_ERROR, {
            id: data.songId,
            description: generateTitleByArtist(data.title, data.artist),
          });
      }
    });
    return () => {
      ws.close();
    };
  }, []);
  return null;
});
WebSocketListener.displayName = "WebSocket Listener";
