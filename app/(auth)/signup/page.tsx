"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { USER_DASHBOARD } from "@/constant";
import { useEffect } from "react";
import UserSignUpForm from "@/components/form/UserSignUpForm";
import Image from "next/image";
import SignInImage from "@/public/undraw_sign_up_n6im.svg";

export default function SignUpPage() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(USER_DASHBOARD);
    }
  }, [session, router]);

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 lg:flex justify-center items-center">
        <div className="w-3/4">
          <Image
            src={SignInImage}
            alt="Image"
            className="object-contain"
            width={1000}
            height={1000}
            priority
          />
        </div>
      </div>
      <div className="p-4 lg:p-8 h-full flex items-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Fill the details to create your account
            </p>
          </div>

          <UserSignUpForm />

          <p className="px-8 text-center text-sm text-muted-foreground">
            By clicking continue, you agree to our{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
