import { z } from "zod";

/**
 * Zod schemas for client-side form validation.
 * These same schemas will be reused server-side in Phase 2.
 * Client validation is for UX only — server validation is authoritative.
 */

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be under 254 characters")
    .trim()
    .toLowerCase(),
  phone: z
    .string()
    .max(20, "Phone number must be under 20 characters")
    .regex(/^[\d\s+\-().]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  interest: z
    .string()
    .max(200, "Please keep your interest under 200 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters")
    .trim(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
