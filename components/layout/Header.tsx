"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "../ModeToggle";
import MobileSidebar from "./sidebar/MobileSidebar";
import Link from "next/link";
import DesktopSidebar from "./sidebar/DesktopSidebar";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { UserNav } from "./user-nav";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="flex justify-center">
            <Link href="/" className="ml-2 font-bold">
              Share Your{" "}
              <span className="bg-gradient-to-r from-[#d17642] via-[#df5607] to-[#d78603] text-transparent bg-clip-text">
                Resume
              </span>
              .com
            </Link>
          </NavigationMenuItem>

          {/* mobile */}
          <span className="flex md:hidden">
            <ModeToggle />
            <MobileSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          </span>

          {/* desktop */}
          <DesktopSidebar />

          <div className="hidden md:flex gap-2">
            <ModeToggle />
            {!session ? (
              <Button onClick={() => signIn()} variant="default">
                Sign In
              </Button>
            ) : (
              <>
                <UserNav />
              </>
            )}
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
