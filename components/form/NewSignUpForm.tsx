"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { userDefaultValues } from "@/constant/defaultValyes";
import { useRouter } from "next/navigation";
import { CrudServices } from "./crud/crudServices";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSignUpValidationSchema } from "./zodValidation";
import * as z from "zod";
import { toast } from "sonner";
import { LogIn } from "@/constant";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../ui/form";
import { FormCombinedInput } from "../common/FormCombinedInput";

type UserFormValue = z.infer<typeof userSignUpValidationSchema>;

export function UserSignUpForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const crudServices = new CrudServices();

  const defaultValues = {
    name: userDefaultValues.name,
    username: userDefaultValues.username,
    email: userDefaultValues.email,
    password: userDefaultValues.password,
    confirmPassword: userDefaultValues.confirmPassword,
  };

  const form = useForm<UserFormValue>({
    resolver: zodResolver(userSignUpValidationSchema),
    defaultValues,
  });

  const onSubmit = async (values: UserFormValue) => {
    setLoading(true);
    const response = await crudServices.register(values);
    if (response.error) {
      toast.error(response.error);
    } else {
      toast.success("User registered successfully");
      router.push(LogIn);
    }
    setLoading(false);
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto max-w-sm">
            <CardHeader>
              <CardTitle className="text-xl">Sign Up</CardTitle>
              <CardDescription>
                Enter your information to create an account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <FormCombinedInput
                              type="text"
                              placeholder="Enter your Name"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-2">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <FormCombinedInput
                              type="text"
                              placeholder="Enter your username"
                              disabled={loading}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <FormCombinedInput
                            type="email"
                            placeholder="Enter your email"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <FormCombinedInput
                            type="password"
                            placeholder="Enter your password"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <FormCombinedInput
                            type="password"
                            placeholder="Confirm your password"
                            disabled={loading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={loading} className="w-full" type="submit">
                  Create an Account
                </Button>
                <Button variant="outline" className="w-full">
                  Sign up with GitHub
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <Link href={LogIn} className="underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </Form>
    </>
  );
}
