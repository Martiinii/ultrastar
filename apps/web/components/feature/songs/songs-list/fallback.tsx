import { SongCardSkeleton } from "../song-card/skeleton";
import { SongList } from "./list";

export const SongListFallback = () => {
  return (
    <SongList>
      {Array.from({ length: 20 }, (_, i) => (
        <SongCardSkeleton key={i} />
      ))}
    </SongList>
  );
};
