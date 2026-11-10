"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyServerErrors } from "@/lib/apply-server-errors";
import {
  CONTACT_FORM_DEFAULTS,
  contactSchema,
  stripPhoneFormatting,
  type ContactFormValues,
} from "@/lib/validation/contact-schema";
import { getErrorMessage, isApiError } from "@/services/api-error";
import { contactService } from "@/services/contact.service";
import type { ContactSource } from "@/types/contact";

export type SubmissionStatus = "idle" | "success" | "error";

const FIELDS = Object.keys(CONTACT_FORM_DEFAULTS) as (keyof ContactFormValues)[];

export function useContactForm(source: ContactSource = "website-contact-page") {
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: CONTACT_FORM_DEFAULTS,
    mode: "onTouched",
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setStatus("idle");
    setErrorMessage(null);
    try {
      await contactService.submit({
        ...values,
        whatsappNumber: stripPhoneFormatting(values.whatsappNumber),
        source,
      });
      form.reset(CONTACT_FORM_DEFAULTS);
      setStatus("success");
    } catch (error) {
      if (isApiError(error) && applyServerErrors(error.fieldErrors, FIELDS, form.setError)) {
        setStatus("idle");
        return;
      }
      setErrorMessage(getErrorMessage(error));
      setStatus("error");
    }
  });

  const startOver = () => setStatus("idle");

  return { form, status, errorMessage, onSubmit, startOver };
}
