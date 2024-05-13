import * as z from "zod";

export const userRegisterSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 chars").max(20),
  username: z.string().min(3, "Username must be at least 3 chars").max(10),
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(5, "Password must be at least 5 chars"),
});

export const userCreateEducationValidationSchema = z.object({
  school: z
    .string()
    .min(3, "College name must be at least 3 chars")
    .max(200, "College name must be less than 200 chars"),
  degree: z
    .string()
    .min(3, "Degree must be at least 3 chars")
    .max(200, "Degree must be less than 200 chars"),
  cgpa: z.string().min(1, "CGPA must be at least 1 chars").max(5, "CGPA should be less than 5 chars"),
  present: z.boolean().default(false).optional(),
  description: z.string().min(10, "Description must be at least 10 chars"),
  startYear: z.string().min(4, "Start Year must be at least 4 chars").max(4, "Not More than 4 chars"),
  endYear: z
    .string()
    .optional()
    .or(z.string().min(4, "End Year must be at least 4 chars").max(4, "Not More than 4 chars")),
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
