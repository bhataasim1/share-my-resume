"use client";

import { ThemeProvider } from "./theme-provider";
import { SessionProvider, SessionProviderProps } from "next-auth/react";
import { getServerSession } from "next-auth";

export default function Providers({
  children,
  session,
}: {
  children: React.ReactNode;
  session: SessionProviderProps["session"];
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SessionProvider session={session} refetchInterval={60 * 5}>
        {children}
      </SessionProvider>
    </ThemeProvider>
  );
}

Providers.getInitialProps = async (ctx: any) => {
  return {
    session: await getServerSession(ctx),
  };
};
