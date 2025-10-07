import { z } from 'zod';
import { isValidEmail } from '.';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .refine(isValidEmail, 'Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(6, 'Password must be at least 6 characters long'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
