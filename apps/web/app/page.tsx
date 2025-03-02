import { Container } from "@/components/container";
import { SongsListRenderer } from "@/components/feature/songs/songs-list";
import { SongListFallback } from "@/components/feature/songs/songs-list/fallback";
import { searchParamsCache } from "@/components/searchParams";
import { type SearchParams } from "nuqs";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  await searchParamsCache.parse(searchParams);
  const { page, search, languages } = searchParamsCache.all();

  const uniqueKey = `${page}|${search}|${languages.join(",")}`;

  return (
    <Container>
      <div className="space-y-10">
        <Suspense key={uniqueKey} fallback={<SongListFallback />}>
          <SongsListRenderer />
        </Suspense>
      </div>
    </Container>
  );
}
