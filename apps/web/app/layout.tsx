import { Navbar } from "@/components/navbar";
import { WebSocketListener } from "@/components/webSocketListener";
import { Providers } from "@/providers";
import { Toaster } from "@ui/components/sonner";
import "@ultrastar/ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers
          theme={{
            attribute: "class",
            defaultTheme: "light",
            disableTransitionOnChange: true,
          }}
        >
          <div className="relative flex min-h-screen flex-col bg-background">
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
          </div>
          <Toaster />
          <WebSocketListener />
        </Providers>
      </body>
    </html>
  );
}
