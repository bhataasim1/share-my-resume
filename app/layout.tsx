import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Provider";
import { Header } from "@/components/layout/Header";

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
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${inter.className} overflow-hidden`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
