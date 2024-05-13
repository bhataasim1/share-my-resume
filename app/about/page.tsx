/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";
import myPhoto from "@/public/myimage.jpg";
import { Button } from "@/components/ui/button";
import {
  LucideGithub,
  LucideInstagram,
  LucideLinkedin,
  LucideMail,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const page = () => {
  return (
    <>
      <section className="w-full py-6 md:py-6 lg:py-5">
        <div className="container grid gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                About Me
              </h1>
              <Separator />
              <p className="text-justify">
                I'm{" "}
                <span className="font-bold text-orange-500">
                  Aasim Ashraf Bhat
                </span>
                , a dedicated Software Engineer and Ethical Hacker with over 3
                years of hands-on experience in designing, developing, and
                securing robust software solutions. My expertise lies in web
                application development and cybersecurity, ensuring the creation
                of efficient, innovative, and secure software systems.
              </p>
              <div className="space-x-3">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-3">
                  Check Me Out
                </h1>
                <Separator />
                <div className="mt-5 space-x-5">
                  <Button size={"icon"}>
                    <Link
                      href="https://in.linkedin.com/in/aasim-bhat-b4726b115"
                      target="_blank"
                    >
                      <LucideLinkedin className="w-6 h-6" />
                    </Link>
                  </Button>
                  <Button size={"icon"}>
                    <Link href="https://github.com/bhataasim1" target="_blank">
                      <LucideGithub className="w-6 h-6" />
                    </Link>
                  </Button>
                  <Button size={"icon"}>
                    <Link
                      href="mailto:bhataasim0fficial@gmail.com"
                      target="_blank"
                    >
                      <LucideMail className="w-6 h-6" />
                    </Link>
                  </Button>
                  <Button size={"icon"}>
                    <Link
                      href="https://www.instagram.com/bhataasim1"
                      target="_blank"
                    >
                      <LucideInstagram className="w-6 h-6" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 relative rounded-xl overflow-hidden">
              <Image
                alt="My Photo"
                src={myPhoto}
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                priority
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 transition duration-300 opacity-0 hover:opacity-100">
                <Link href="https://github.com/bhataasim1/share-my-resume/raw/main/public/myResume.pdf">
                  <Button size={"sm"}>Download CV</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
