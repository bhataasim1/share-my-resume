"use client";

import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "../ModeToggle";
import { MobileSidebar } from "./sidebar/MobileSidebar";
import Link from "next/link";
import DesktopSidebar from "./sidebar/DesktopSidebar";
import { Button } from "../ui/button";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky border-b-[1px] top-0 z-40 w-full bg-white dark:border-b-slate-700 dark:bg-background">
      <NavigationMenu className="mx-auto">
        <NavigationMenuList className="container h-14 px-4 w-screen flex justify-between ">
          <NavigationMenuItem className="flex justify-center">
            <Link href="/" className="ml-2 font-bold">
              Share My <span className="text-orange-500">Resume</span>.com
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
            <Button variant="outline">Sign In</Button>
            <Button variant={'destructive'}>Sign Up</Button>
          </div>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
};
