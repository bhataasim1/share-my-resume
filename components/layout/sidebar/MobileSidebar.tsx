import React, { use } from "react";
import Link from "next/link";
import { LucideLogIn, LucideUserCheck, MenuIcon } from "lucide-react";
import { dashboardNavItems, navItems } from "@/constant/navItems";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import Nav from "../Nav";
import { signIn, signOut, useSession } from "next-auth/react";
import { signUp } from "@/constant";

export type MobileSidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

export default function MobileSidebar({
  isOpen,
  setIsOpen,
}: MobileSidebarProps) {
  const { data: session } = useSession();
  return (
    <ScrollArea className="h-full">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="px-2">
          <MenuIcon size={"36px"} />
        </SheetTrigger>
        <SheetContent side={"left"} className="!px-0">
          <SheetHeader className="flex justify-center items-center">
            <SheetTitle>
              <Link href="/">
                Share My{" "}
                <span className="bg-gradient-to-r from-[#d17642] via-[#df5607] to-[#d78603] text-transparent bg-clip-text">
                  Resume
                </span>
                .com
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="space-y-4 py-4">
            <div className="px-3 py-2">
              {/* <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                Navigation
              </h2> */}
              <div className="space-y-1">
                {/* <Nav items={navItems} setOpen={setIsOpen} /> */}
                <div className="flex flex-col gap-2 justify-center md:flex-row md:justify-between">
                  {session ? (
                    <>
                      <Nav items={dashboardNavItems} setOpen={setIsOpen} />

                      <Button
                        variant="default"
                        className="w-full md:w-auto"
                        onClick={() => signOut()}
                      >
                        Log Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Nav items={navItems} setOpen={setIsOpen} />
                      <Button
                        onClick={() => signIn()}
                        variant="outline"
                        className="w-full md:w-auto gap-3"
                      >
                        <LucideLogIn size={24} />
                        Sign In
                      </Button>
                      <Link href={signUp}>
                        <Button
                          variant="destructive"
                          className="w-full md:w-auto gap-2"
                        >
                          <LucideUserCheck size={24} />
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </ScrollArea>
  );
}
