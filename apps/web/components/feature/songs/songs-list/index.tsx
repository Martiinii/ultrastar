import { api } from "@/lib/api";
import { SongList } from "./list";
import { SongsListData } from "./listData";
import { Pages } from "./pagination";

type PaginatedSongsProps = {
  page: number;
  search: string;
  languages: string;
  searchParams?: SearchParams;
};
export const PaginatedSongs = async ({
  page,
  search,
  languages,
  searchParams,
}: PaginatedSongsProps) => {
  const songs = await api
    .search({ page })
    .get({ query: { search, languages } });

  return (
    <div className="space-y-10">
      <SongList>
        <SongsListData data={songs.data} />
      </SongList>
      <Pages
        currentPage={page}
        totalPages={songs.data?.totalPages ?? 1}
        searchParams={searchParams}
      />
    </div>
  );
};
