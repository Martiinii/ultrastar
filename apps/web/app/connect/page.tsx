import { Container } from "@/components/container";
import { api } from "@/lib/api";
import { H1 } from "@ui/components/typography";
import { networkInterfaces } from "os";
import QRCode from "react-qr-code";

export const dynamic = "force-dynamic";
export const revalidate = 120;

const getServerIp = () => {
  const interfaces = networkInterfaces();

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]!) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
};

const getAppUrl = () => `http://${getServerIp()}:3000`;

export default async function ConnectPage() {
  const songCount = await api.search.count.get();

  return (
    <Container className="flex flex-1 gap-10 items-center justify-between">
      <section className="max-w-xl space-y-4">
        <H1>Connect and download songs</H1>
        <p className="text-2xl text-muted-foreground">
          Scan the QR code to connect to UltraStar database on your phone.
          Access and download from a library of <b>{songCount.data ?? 0}</b>{" "}
          songs.
        </p>
      </section>
      <QRCode
        className="size-auto max-w-lg grow p-4 bg-white"
        value={getAppUrl()}
      />
    </Container>
  );
}
