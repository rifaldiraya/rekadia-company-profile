"use client";

import { CircleCheck, LoaderCircle, Mail } from "lucide-react";
import { NEWSLETTER } from "@/content/home";
import { useNewsletterForm } from "@/hook/use-newsletter-form";
import { cn } from "@/lib/cn";

export function NewsletterForm() {
  const { form, onSubmit, showSuccess, errorMessage, dismissSuccess } = useNewsletterForm();
  const {
    register,
    formState: { errors, isSubmitting },
  } = form;
  const fieldError = errors.email?.message;
  const message = fieldError ?? errorMessage;

  return (
    <div className="w-full md:w-auto">
      <form onSubmit={onSubmit} noValidate className="flex flex-wrap items-center gap-2.5 sm:flex-nowrap">
        <div className="relative w-full min-w-0 flex-1 sm:w-[290px] sm:flex-none">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <Mail
            aria-hidden="true"
            size={18}
            className="pointer-events-none absolute top-1/2 left-[15px] -translate-y-1/2 text-brand"
          />
          <input
            id="newsletter-email"
            type="email"
            autoComplete="email"
            placeholder={NEWSLETTER.placeholder}
            aria-invalid={Boolean(fieldError)}
            aria-describedby={message ? "newsletter-message" : undefined}
            {...register("email")}
            className={cn(
              "h-10 w-full truncate rounded-[10px] border bg-white py-2.5 pr-2.5 pl-[45px] font-quicksand text-sm text-[#333] outline-none focus:border-brand max-sm:text-[13px]",
              fieldError ? "border-[#ff6b6b]" : "border-[#ccc]",
            )}
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-[10px] border border-white bg-white px-5 font-quicksand text-sm font-bold whitespace-nowrap text-brand-light transition-colors hover:bg-transparent hover:text-white disabled:cursor-wait disabled:opacity-80"
        >
          {isSubmitting && <LoaderCircle aria-hidden="true" size={16} className="animate-spin" />}
          {isSubmitting ? "Subscribing..." : NEWSLETTER.submit}
        </button>
      </form>
      {message && (
        <p id="newsletter-message" role="alert" className="mt-2 text-xs text-[#ffb4b4]">
          {message}
        </p>
      )}

      <div
        role="status"
        aria-live="polite"
        className={cn(
          "fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-opacity duration-300",
          showSuccess ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        onClick={dismissSuccess}
      >
        {showSuccess && (
          <div className="flex w-[90%] max-w-[400px] items-center gap-[15px] rounded-[10px] bg-brand-light px-[30px] py-5 font-quicksand text-white shadow-[0_4px_8px_rgba(0,0,0,0.2)]">
            <CircleCheck aria-hidden="true" size={28} className="shrink-0" />
            <div>
              <p className="mb-[5px] text-base font-bold">{NEWSLETTER.successTitle}</p>
              <p>{NEWSLETTER.successMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
