import { z } from "zod";

const INDONESIAN_MOBILE = /^(?:\+?62|0)8\d{7,12}$/;

export const stripPhoneFormatting = (value: string) => value.replace(/[\s\-().|]/g, "");

export const contactSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(256, "Full name must be at most 256 characters."),
  companyName: z
    .string()
    .trim()
    .min(2, "Please enter your company name.")
    .max(256, "Company name must be at most 256 characters."),
  workEmail: z
    .string()
    .trim()
    .min(1, "Please enter your work email.")
    .max(256, "Email must be at most 256 characters.")
    .email("Please enter a valid email address."),
  whatsappNumber: z
    .string()
    .trim()
    .min(1, "Please enter your WhatsApp number.")
    .refine((value) => INDONESIAN_MOBILE.test(stripPhoneFormatting(value)), {
      message: "Please enter a valid WhatsApp number, e.g. +62 812-3456-7890.",
    }),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const CONTACT_FORM_DEFAULTS: ContactFormValues = {
  fullName: "",
  companyName: "",
  workEmail: "",
  whatsappNumber: "",
};
