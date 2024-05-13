"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import dashboardImage from "@/public/undraw_resume_re_hkth.svg";

export default function Page() {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex-1 p-2 px-4">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">
            Hi,{" "}
            <span className="font-bold text-orange-500 m-4">
              {session?.user?.name}
            </span>
            👋
          </h2>
        </div>
        <div className="flex justify-center items-center object-cover m-3">
          <Image src={dashboardImage} alt="DashboardImage" priority />
        </div>
      </div>
    </>
  );
}
