import { Container } from "@/components/container";
import { PaginatedSongs } from "@/components/feature/songs/songs-list";
import { SongListFallback } from "@/components/feature/songs/songs-list/fallback";
import { WebSocketListener } from "@/components/webSocketListener";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const currentPage = Number(searchParams?.["page"]) || 1;
  const currentSearch = searchParams?.["search"]?.toString() || "";
  let currentLanguages = searchParams?.["language"] ?? "";
  if (Array.isArray(currentLanguages)) {
    currentLanguages = currentLanguages.join(",");
  }

  const uniqueKey = `${currentPage}|${currentSearch}|${currentLanguages}`;

  return (
    <Container>
      <Suspense key={uniqueKey} fallback={<SongListFallback />}>
        <PaginatedSongs
          page={currentPage}
          search={currentSearch}
          languages={currentLanguages}
          searchParams={searchParams}
        />
      </Suspense>
      <WebSocketListener />
    </Container>
  );
}
