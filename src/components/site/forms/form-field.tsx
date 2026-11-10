import { forwardRef, useId, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(function FormField(
  { label, error, className, id, ...inputProps },
  ref,
) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;

  return (
    <div className={className}>
      <label htmlFor={inputId} className="mb-[5px] block font-montserrat text-xs font-medium text-ink">
        {label}
      </label>
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          "block h-[38px] w-full rounded-md border bg-white px-3 py-2 text-sm text-[#333] outline-none transition-colors placeholder:text-[#999] focus:border-brand",
          error ? "border-[#e5484d]" : "border-muted",
        )}
        {...inputProps}
      />
      <p id={errorId} role={error ? "alert" : undefined} className="min-h-2.5 pt-1 text-xs leading-[14px] text-[#e5484d]">
        {error}
      </p>
    </div>
  );
});
