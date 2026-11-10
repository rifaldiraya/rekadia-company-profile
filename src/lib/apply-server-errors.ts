import type { FieldValues, Path, UseFormSetError } from "react-hook-form";
import type { ApiFieldErrors } from "@/types/api";

/** Pushes server-side field errors into react-hook-form. Returns true if any field matched. */
export function applyServerErrors<TValues extends FieldValues>(
  fieldErrors: ApiFieldErrors,
  fields: readonly Path<TValues>[],
  setError: UseFormSetError<TValues>,
) {
  let matched = false;
  for (const field of fields) {
    const messages = fieldErrors[field];
    if (messages?.length) {
      setError(field, { type: "server", message: messages[0] }, { shouldFocus: !matched });
      matched = true;
    }
  }
  return matched;
}
