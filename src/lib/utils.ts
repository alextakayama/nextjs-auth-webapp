import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const EmailSchema = z.string()
  .email({ message: 'Please enter a valid email.' })
  .trim();

const PasswordSchema = z.string()
  .min(8, { message: 'Must be at least 8 characters long' })
  .regex(/[a-zA-Z]/, { message: 'Must contain at least one letter.' })
  .regex(/[0-9]/, { message: 'Must contain at least one number.' })
  .regex(/[^a-zA-Z0-9]/, { message: 'Must contain at least one special character.' })
  .trim();

export const LoginFormSchema = z.object({
  email: EmailSchema,
  password: PasswordSchema,
})

export const SignupFormSchema = z.object({
  name: z.string()
    .min(2, { message: 'Name must be at least 2 characters long.' })
    .trim(),
  email: EmailSchema,
  password: PasswordSchema,
})

export type LoginFormState = 
  | {
      errors?: {
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined

export type SignupFormState = 
  | {
      errors?: {
        name?: string[]
        email?: string[]
        password?: string[]
      }
      message?: string
    }
  | undefined