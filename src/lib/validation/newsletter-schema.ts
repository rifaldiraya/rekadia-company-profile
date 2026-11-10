import { z } from "zod";

export const newsletterSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email address.")
    .max(256, "Email must be at most 256 characters.")
    .email("Please enter a valid email address."),
});

export type NewsletterFormValues = z.infer<typeof newsletterSchema>;
