"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { FormCombinedInput } from "../common/FormCombinedInput";
import { userDefaultValues } from "@/constant/defaultValyes";
import { userSigninValidationSchema } from "./zodValidation";
import { USER_DASHBOARD } from "@/constant";

type UserFormValue = z.infer<typeof userSigninValidationSchema>;

export default function UserLoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const [loading, setLoading] = useState(false);
  const defaultValues = {
    email: userDefaultValues.email,
    password: userDefaultValues.password,
  };
  const form = useForm<UserFormValue>({
    resolver: zodResolver(userSigninValidationSchema),
    // defaultValues,
  });
  const router = useRouter();

  const onSubmit = async (data: UserFormValue) => {
    try {
      setLoading(true);
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: callbackUrl ?? USER_DASHBOARD,
        redirect: false,
      });
      if (response?.error) {
        if (response.error === "CredentialsSignin") {
          toast.error("Invalid credentials", {
            description: "Please check your email and password",
            dismissible: true,
          });
        }
      }

      if (response?.ok) {
        toast.success("Logged in successfully", {
          description: "You are now logged in",
          dismissible: true,
        });
        router.replace(USER_DASHBOARD);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred", {
        description: "Please try again later",
        dismissible: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <FormCombinedInput
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <FormCombinedInput
                    {...field}
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={loading} className="ml-auto w-full" type="submit">
            Continue With Email
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      {/* <GoogleSignInButton /> */}
      <Button variant="outline" className="w-full" disabled>
        Login with Google
      </Button>
    </>
  );
}
