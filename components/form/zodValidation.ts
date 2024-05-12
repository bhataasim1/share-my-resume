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

export const userCreateEducationValidationSchema = z.object({
  school: z
    .string()
    .min(3, { message: "School name must be at least 3 chars" }),
  degree: z
    .string()
    .min(3, { message: "Degree name must be at least 3 chars" }),
  cgpa: z.string().min(1, { message: "CGPA must be at least 1 chars" }),
  present: z.boolean().optional(),
  description: z
    .string()
    .min(10, { message: "Description must be at least 3 chars" }),
  startYear: z
    .string()
    .min(4, { message: "Start year must be at least 4 chars" }),
  endYear: z
    .string()
    .min(4, { message: "End year must be at least 4 chars" })
    .optional()
    .or(
      z.string().min(4, { message: "End year must be at least 4 chars" }).max(4)
    ),
});

export const userExperienceValidationSchema = z.object({
  company: z
    .string()
    .min(3, { message: "Company name must be at least 3 chars" }),
  position: z.string().min(3, { message: "Position must be at least 3 chars" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 chars" }),
  present: z.boolean().optional(),
  skills: z
    .array(z.string())
    .max(10, { message: "Select at most two skills" })
    .nonempty({ message: "Select at least one skill" })
    .optional(),
  startYear: z
    .string()
    .min(4, { message: "Start year must be at least 4 chars" }),
  endYear: z
    .string()
    .optional()
    .or(
      z.string().min(4, { message: "End year must be at least 4 chars" }).max(4)
    ),
});
