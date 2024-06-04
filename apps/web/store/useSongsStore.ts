import { create } from "zustand";

type SongStore = {
  songs: Map<string, "loading" | "complete">;
  addDownloading: (id: string) => void;
  removeDownloading: (id: string) => void;
  completeDownload: (id: string) => void;
};
export const useSongsStore = create<SongStore>((set) => ({
  songs: new Map(),
  addDownloading: (id) =>
    set((state) => ({
      songs: new Map(state.songs).set(id, "loading"),
    })),
  removeDownloading: (id) =>
    set((state) => {
      const map = new Map(state.songs);
      map.delete(id);

      return {
        songs: map,
      };
    }),
  completeDownload: (id) =>
    set((state) => {
      const map = new Map(state.songs);
      map.set(id, "complete");

      return {
        songs: map,
      };
    }),
}));
