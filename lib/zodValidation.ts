import * as z from "zod";

export const userRegisterSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 chars").max(20),
    username: z
      .string()
      .min(3, "Username must be at least 3 chars").max(10),
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(5, "Password must be at least 5 chars"),
  });