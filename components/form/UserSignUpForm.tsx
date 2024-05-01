import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { FormCombinedInput } from "../common/FormCombinedInput";
import { use, useState } from "react";
import { Button } from "../ui/button";
import { userDefaultValues } from "@/constant/defaultValyes";
import { userSignUpValidationSchema } from "./zodValidation";
import { LogIn } from "@/constant";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type UserFormValue = z.infer<typeof userSignUpValidationSchema>;

export default function UserSignUpForm() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      });
      if (response.ok) {
        toast.success("User registered successfully");
        router.push(LogIn);
      } else {
        toast.error("Error registering user");
        console.error("Error registering user:", response.statusText);
      }
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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

          <Button
            disabled={loading}
            className="ml-auto w-full mt-2"
            type="submit"
          >
            Register Your Account
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
    </>
  );
}
