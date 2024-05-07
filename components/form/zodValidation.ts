import * as z from "zod";

export const userSignUpValidationSchema = z
  .object({
    name: z.string().min(3, { message: "Name must be at least 3 chars" }),
    username: z
      .string()
      .min(3, { message: "Username must be at least 3 chars" }),
    email: z.string().email({ message: "Enter a valid email address" }),
    password: z
      .string()
      .min(5, { message: "Password must be at least 5 chars" }),
    confirmPassword: z
      .string()
      .min(5, { message: "Password must be at least 5 chars" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const userSigninValidationSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address" }),
  password: z.string().min(2, { message: "Password must be at least 2 chars" }),
});

export const userUpdateValidationSchema = z.object({
  bio: z
    .string()
    .min(20, { message: "Bio should be minimum of 20 Characters" })
    .optional(),
  skills: z
    .array(z.string())
    .max(10, { message: "Select at most two skills" })
    .nonempty({ message: "Select at least one skill" })
    .optional(),
});

export const userUpdateImageValidationSchema = z.object({
  avatar: z.string(),
});
