import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";
import { Header } from "@/components/layout/Header";
import { getServerSession } from "next-auth";
import { Toaster } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Share My Resume",
  description:
    "Share My Resume is a platform to share your resume with others.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} overflow-auto`}>
        <Providers session={session}>
          <Toaster
            richColors={true}
            position={"top-right"}
            closeButton={true}
          />
          <Header />
          {children}
          <ScrollArea />
        </Providers>
      </body>
    </html>
  );
}
