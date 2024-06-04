import { api } from "@/lib/api";
import { SongsList } from "./list";
import { Pages } from "./pagination";

type PaginatedSongsProps = {
  page: number;
  searchParams?: SearchParams;
};
export const PaginatedSongs = async ({
  page,
  searchParams,
}: PaginatedSongsProps) => {
  const songs = await api.search({ page }).get();

  return (
    <>
      <div className="space-y-10">
        <SongsList data={songs.data} />
        <Pages
          currentPage={page}
          totalPages={songs.data?.totalPages ?? 1}
          searchParams={searchParams}
        />
      </div>
    </>
  );
};
