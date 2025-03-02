import { searchParamsCache } from "@/components/searchParams";
import { api } from "@/lib/api";
import { SongList } from "./list";
import { SongsListData } from "./listData";
import { Pages } from "./pagination";

export const SongsListRenderer = async () => {
  const { page, search, languages } = searchParamsCache.all();

  const songs = await api
    .search({ page })
    .get({ query: { search, languages: languages.join(",") } });

  return (
    <>
      <SongList>
        <SongsListData data={songs.data} />
      </SongList>
      <Pages totalPages={songs.data?.totalPages || 1} />
    </>
  );
};
