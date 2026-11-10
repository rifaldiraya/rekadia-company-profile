"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applyServerErrors } from "@/lib/apply-server-errors";
import { newsletterSchema, type NewsletterFormValues } from "@/lib/validation/newsletter-schema";
import { getErrorMessage, isApiError } from "@/services/api-error";
import { newsletterService } from "@/services/newsletter.service";

const SUCCESS_VISIBLE_MS = 5_000;

export function useNewsletterForm() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });

  useEffect(() => {
    if (!showSuccess) return undefined;
    const timer = setTimeout(() => setShowSuccess(false), SUCCESS_VISIBLE_MS);
    return () => clearTimeout(timer);
  }, [showSuccess]);

  const onSubmit = form.handleSubmit(async ({ email }) => {
    setErrorMessage(null);
    try {
      await newsletterService.subscribe({ email, language: "en" });
      form.reset({ email: "" });
      setShowSuccess(true);
    } catch (error) {
      if (isApiError(error) && applyServerErrors(error.fieldErrors, ["email"], form.setError)) return;
      setErrorMessage(getErrorMessage(error));
    }
  });

  return { form, onSubmit, showSuccess, errorMessage, dismissSuccess: () => setShowSuccess(false) };
}
