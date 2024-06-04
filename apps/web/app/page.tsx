import { Container } from "@/components/container";
import { PaginatedSongs } from "@/components/songs/songs-list";
import { WebSocketListener } from "@/components/webSocketListener";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home({ searchParams }: { searchParams: SearchParams }) {
  const currentPage = Number(searchParams?.["page"]) || 1;

  return (
    <Container>
      <PaginatedSongs page={currentPage} searchParams={searchParams} />
      <WebSocketListener />
    </Container>
  );
}
