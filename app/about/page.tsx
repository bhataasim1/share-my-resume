import Image from "next/image";
import React from "react";
import myPhoto from "@/public/Aasim.jpeg";
import { Button } from "@/components/ui/button";
import {
  LucideFileText,
  LucideGithub,
  LucideLinkedin,
  LucideMail,
} from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container grid gap-12 px-4 md:px-6 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                About Me
              </h1>
              <p className=" text-gray-500 md:text-xl dark:text-gray-400 text-justify">
                Hi, i am <span className="text-orange-600">Aasim Ashraf</span> a
                full stack developer. I am a self-taught developer who loves to
                build things. I have worked with various technologies including
                React.js, Next.js, Node.js, Express.js, Laravel, PHP, MySQL,
                PostgreSQL, MongoDB etc. I am always eager to learn new
                technologies and improve my skills.
              </p>
              <div className="space-x-3">
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
                    href="/"
                    target="_blank"
                  >
                    <LucideFileText className="w-6 h-6" />
                  </Link>
                </Button>
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
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
