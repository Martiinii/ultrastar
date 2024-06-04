import { api } from "@ultrastar/libs";
import { SongCard } from "../song-card";
type SongsResponse = Awaited<
  ReturnType<ReturnType<(typeof api)["search"]>["get"]>
>["data"];

export type SongsListProps = {
  data: SongsResponse;
};
export const SongsList = ({ data }: SongsListProps) => {
  if (!data || !data.songs.length) {
    return <span>No songs</span>;
  }

  return (
    <section className="flex flex-wrap gap-x-6 gap-y-10 justify-center">
      {data.songs.map((s) => (
        <SongCard key={s.id} {...s} />
      ))}
    </section>
  );
};
