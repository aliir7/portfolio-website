"use client";

import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { z } from "zod";
import { adminErrorMessage } from "@/lib/validations/admin-errors";

/**
 * Client-side validation for admin forms with the same Zod schema the server action uses.
 * A field shows its error once it has been touched (blurred) or after a submit attempt; the
 * save button is never disabled by validity, so the user always learns what is wrong.
 * Error paths are dotted ("title.fa", "0.href"), matching Zod's issue paths.
 */
export function useFormValidation(schema: z.ZodType, values: unknown) {
  const [touched, setTouched] = useState<ReadonlySet<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [pending, setPending] = useState(false);

  const result = schema.safeParse(values);
  const errors: [path: string, message: string][] = result.success
    ? []
    : result.error.issues.map((issue) => [issue.path.join("."), adminErrorMessage(issue)]);

  // An error belongs to a field when it sits at the field's path or below it (e.g. one tech-stack item).
  const visibleError = (path: string) =>
    submitted || touched.has(path)
      ? errors.find(([key]) => key === path || key.startsWith(`${path}.`))?.[1]
      : undefined;

  const touch = (path: string) => setTouched((current) => (current.has(path) ? current : new Set(current).add(path)));

  const reset = useCallback(() => {
    setTouched(new Set());
    setSubmitted(false);
  }, []);

  /** Runs `handler` only when the data is valid; otherwise reveals every error and shows a toast. */
  const submit = async (handler: () => unknown) => {
    setSubmitted(true);
    if (errors.length) {
      toast.error("لطفاً خطاهای فرم را برطرف کن.");
      return false;
    }
    setPending(true);
    try {
      await handler();
    } finally {
      setPending(false);
    }
    return true;
  };

  return {
    isValid: result.success,
    pending,
    submit,
    reset,
    /** Props for TextField, NumberField, SelectField and UploadField. */
    field: (path: string) => ({ error: visibleError(path), onBlur: () => touch(path) }),
    /** Props for LocalizedField (one error per language). */
    localized: (path: string) => ({
      error: { fa: visibleError(`${path}.fa`), en: visibleError(`${path}.en`) },
      onBlur: (locale: "fa" | "en") => touch(`${path}.${locale}`),
    }),
  };
}

export type FormValidation = ReturnType<typeof useFormValidation>;
