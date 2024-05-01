"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { LogIn, dashboard, signUp } from "@/constant";
import { HeroCards } from "./HeroCard";
import { useSession } from "next-auth/react";

export default function Hero() {
  const { data: session } = useSession();

  return (
    <section className="container grid lg:grid-cols-2 place-items-center py-20 md:py-32 gap-10">
      <div className="text-center lg:text-start space-y-6">
        <main className="text-5xl md:text-6xl font-bold">
          <h1 className="inline">
            <span className="inline bg-gradient-to-r from-[#c0485a]  to-[#D247BF] text-transparent bg-clip-text">
              Share My{" "}
            </span>
          </h1>
          <h2 className="inline">
            <span className="inline bg-gradient-to-r from-[#d17642] via-[#df5607] to-[#d78603] text-transparent bg-clip-text">
              Resume
            </span>
          </h2>
        </main>

        <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
          Share My Resume is a platform that allows you to share your resume
          with anyone, anywhere, anytime. it helps you to create a digital
          resume that you can share with anyone, anywhere, anytime.
        </p>

        <div className="space-y-4 md:space-y-0 md:space-x-4">
          {session ? (
            <Link href={dashboard}>
              <Button className="w-full md:w-1/3">Dashboard</Button>
            </Link>
          ) : (
            <>
              <Link href={LogIn}>
                <Button className="w-full md:w-1/3">Sign in</Button>
              </Link>
              <Link href={signUp}>
                <Button className="w-full md:w-1/3 mt-4" variant="destructive">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Hero cards sections */}
      <div className="z-10">
        <HeroCards />
      </div>
    </section>
  );
}
