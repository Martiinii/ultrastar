import type { api } from "@/lib/api";
import { Disc3 } from "lucide-react";
import { SongCard } from "../song-card";
type SongsResponse = Awaited<
  ReturnType<ReturnType<(typeof api)["search"]>["get"]>
>["data"];

export type SongsListProps = {
  data: SongsResponse;
};
export const SongsList = ({ data }: SongsListProps) => {
  if (!data || !data.songs.length) {
    return <NoSongsFound />;
  }

  return (
    <section className="flex flex-wrap gap-x-6 gap-y-10 justify-center">
      {data.songs.map((s) => (
        <SongCard key={s.id} {...s} />
      ))}
    </section>
  );
};

const NoSongsFound = () => {
  return (
    <div className="flex justify-center mt-20 text-2xl items-center gap-2">
      <span>Empty playlist!</span>
      <Disc3 className="size-10" />
      <span>Try a different tune</span>
    </div>
  );
};
