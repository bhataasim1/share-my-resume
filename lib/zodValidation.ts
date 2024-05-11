import * as z from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 chars").max(20),
  username: z.string().min(3, "Username must be at least 3 chars").max(10),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(5, "Password must be at least 5 chars"),
});

export const userCreateEducationValidationSchema = z.object({
  school: z.string().min(3, "College name must be at least 3 chars").max(100),
  degree: z.string().min(3, "Degree must be at least 3 chars").max(100),
  cgpa: z.string().min(1, "CGPA must be at least 1 chars").max(5),
  present: z.boolean().default(false).optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 chars")
    .max(100),
  startYear: z.string().min(4, "Start Year must be at least 4 chars").max(4),
  endYear: z.string().min(4, "End Year must be at least 4 chars").max(4),
});
