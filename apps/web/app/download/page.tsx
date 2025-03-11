import { Container } from "@/components/container";
import { DownloadUSDBSongsForm } from "@/components/forms/downloadUSDBSongsForm";
import { H1 } from "@ui/components/typography";

export default function DownloadPage() {
  return (
    <Container className="flex flex-1 flex-col gap-10 items-center justify-center">
      <section className="max-w-xl space-y-4">
        <H1>Download songs from USDB</H1>
        <p className="text-2xl text-muted-foreground">
          Click the button below to start downloading songs metadata from USDB.
          This process can take some time (20-30 minutes with ~300 Mbps download
          speed), but other factors may further increase time.
        </p>
      </section>
      <DownloadUSDBSongsForm />
    </Container>
  );
}
