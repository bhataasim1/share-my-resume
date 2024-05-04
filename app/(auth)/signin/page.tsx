"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { USER_DASHBOARD, SIGNUP } from "@/constant";
import { useEffect } from "react";
import UserLoginForm from "@/components/form/UserLoginForm";
import Image from "next/image";
import SignInImage from "@/public/undraw_mobile_login_re_9ntv.svg";

export default function LoginPage() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push(USER_DASHBOARD);
    }
  }, [session, router]);

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <UserLoginForm />
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href={SIGNUP} className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex items-center justify-center">
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
    </div>
  );
}
