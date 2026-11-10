"use client";

import { LoaderCircle } from "lucide-react";
import { CONTACT_FORM_COPY } from "@/content/contact";
import { useContactForm } from "@/hook/use-contact-form";
import { cn } from "@/lib/cn";
import type { ContactSource } from "@/types/contact";
import { FormField } from "./form-field";

/** `email` mirrors the E-Office Email page form: stacked name fields on phones, borderless bold button. */
type ContactFormVariant = "default" | "email";

const VARIANT_COPY: Record<ContactFormVariant, { namePlaceholder: string; whatsappLabel: string; whatsappPlaceholder: string }> = {
  default: { namePlaceholder: "Full Name", whatsappLabel: "No WhatsApp", whatsappPlaceholder: "+62 | xxx-xxx-xxxx" },
  email: { namePlaceholder: "Name", whatsappLabel: "No Whatsapp", whatsappPlaceholder: "+62 | xxx-xxx-xxx" },
};

interface ContactFormProps {
  source?: ContactSource;
  variant?: ContactFormVariant;
}

export function ContactForm({ source, variant = "default" }: ContactFormProps) {
  const { form, status, errorMessage, onSubmit, startOver } = useContactForm(source);
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;
  const copy = VARIANT_COPY[variant];

  if (status === "success") {
    return (
      <div role="status" className="mt-6 mb-[15px] bg-[#ddd] p-5 text-center">
        <p>{CONTACT_FORM_COPY.success}</p>
        <button
          type="button"
          onClick={startOver}
          className="mt-3 cursor-pointer font-montserrat text-xs font-medium text-brand-dark underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-busy={isSubmitting} className="mt-6 mb-[15px]">
      <div
        className={cn(
          variant === "email" ? "flex gap-3 *:flex-1 max-sm:flex-col max-sm:gap-0" : "grid grid-cols-2 gap-x-3",
        )}
      >
        <FormField
          label="Full Name"
          placeholder={copy.namePlaceholder}
          autoComplete="name"
          maxLength={256}
          error={errors.fullName?.message}
          {...register("fullName")}
        />
        <FormField
          label="Company Name"
          placeholder="PT/CV"
          autoComplete="organization"
          maxLength={256}
          error={errors.companyName?.message}
          {...register("companyName")}
        />
      </div>
      <FormField
        label="Work Email"
        type="email"
        placeholder="Name@company.co.id"
        autoComplete="email"
        maxLength={256}
        error={errors.workEmail?.message}
        {...register("workEmail")}
      />
      <FormField
        label={copy.whatsappLabel}
        type="tel"
        placeholder={copy.whatsappPlaceholder}
        autoComplete="tel"
        inputMode="tel"
        maxLength={20}
        error={errors.whatsappNumber?.message}
        {...register("whatsappNumber")}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(
          "btn-gradient mt-3.5 flex w-full cursor-pointer items-center justify-center gap-2 rounded px-[15px] py-[9px] font-montserrat text-base text-white transition hover:brightness-110 disabled:cursor-wait disabled:opacity-80",
          variant === "email" ? "font-semibold" : "border border-body font-medium",
        )}
      >
        {isSubmitting && <LoaderCircle aria-hidden="true" size={18} className="animate-spin" />}
        {isSubmitting ? CONTACT_FORM_COPY.submitting : CONTACT_FORM_COPY.submit}
      </button>

      {status === "error" && (
        <div role="alert" className="mt-2.5 bg-[#ffdede] p-2.5 text-sm">
          <p>{CONTACT_FORM_COPY.failure}</p>
          {errorMessage && <p className="mt-1 text-xs text-[#8a2c2c]">{errorMessage}</p>}
        </div>
      )}
    </form>
  );
}
