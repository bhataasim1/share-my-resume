"use client";

import { ChevronRightIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import DashboardLeftSidebarNav from "@/components/layout/DashboardLeftSidebarNav";
import { Toaster } from "sonner";

const breadcrumbProps = {
  homeElement: "Dashboard",
  separator: <ChevronRightIcon className="h-4 w-4" />,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <DashboardLeftSidebarNav />
      {children}
      <ScrollArea />
    </div>
  );
}
