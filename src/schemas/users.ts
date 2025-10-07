import { z } from "zod";
import { isValidEmail, isValidUrl } from ".";

const baseUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .refine(isValidEmail, "Enter a valid email"),
  role: z.string().min(1, "Role is required"),
  avatar: z
    .string()
    .trim()
  .min(1, "Avatar is required")
    .refine(isValidUrl, "Enter a valid image URL"),
});

export const editUserSchema = baseUserSchema;

export const createUserSchema = baseUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export type EditUserFormValues = z.infer<typeof editUserSchema>;
export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UserFormValues = EditUserFormValues & { password?: string };
