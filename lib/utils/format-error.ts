import type { ActionError, Translator } from "@/types";
import type { z } from "zod";
import { ZodError } from "zod";

export type ErrorTranslator = (
  key: any,
  values?: Record<string, string | number>,
) => string;

type PostgresError = {
  code?: string;
  detail?: string;
  message?: string;
};

function formatZodIssue(issue: z.ZodIssue, t?: ErrorTranslator): string {
  if (!t) return issue.message;
  // ✅ اگر message خودش کلید ترجمه باشد (schemaهای سفارشی)، مستقیم ترجمه کن
  if (issue.message.startsWith("errors.")) return t(issue.message);
  const field = issue.path.length ? String(issue.path.join(".")) : undefined;
  switch (issue.code) {
    case "invalid_type":
      return t("errors.validation.invalidType", { field: field ?? "" });
    case "too_small":
      return t("errors.validation.tooSmall", {
        field: field ?? "",
        minimum: Number(issue.minimum),
      });
    case "too_big":
      return t("errors.validation.tooBig", {
        field: field ?? "",
        maximum: Number(issue.maximum),
      });
    case "invalid_format":
      return t("errors.validation.invalidFormat", { field: field ?? "" });
    default:
      return issue.message;
  }
}

export function formatZodIssues(
  error: ZodError,
  t?: ErrorTranslator,
): ZodError["issues"] {
  return error.issues.map((issue) => ({
    ...issue,
    message: formatZodIssue(issue, t),
  }));
}

export function firstErrorKey(errors: unknown): string {
  if (!Array.isArray(errors) || errors.length === 0) return "";
  const first = errors[0];
  if (typeof first === "string") return first;
  if (first && typeof first === "object" && "message" in first) {
    return String((first as { message?: unknown }).message ?? "");
  }
  return "";
}

export function resolveFieldError(
  isTouched: boolean,
  clientErrors: unknown,
  serverErrors: string[] | undefined,
  t: Translator,
): string | null {
  if (isTouched) {
    const key = firstErrorKey(clientErrors);
    if (key) return t(key as Parameters<typeof t>[0]);
  }
  return serverErrors?.[0] ?? null;
}

export function zodIssuesToFieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
): Record<string, { message: string }[]> {
  return issues.reduce<Record<string, { message: string }[]>>((acc, issue) => {
    const key = String(issue.path[0] ?? "form");
    if (!acc[key]) acc[key] = [];
    acc[key].push({ message: issue.message });
    return acc;
  }, {});
}

export function getActionErrorMessage(error: ActionError): string {
  return error.type === "custom"
    ? error.message
    : error.issues.map((issue) => issue.message).join(" | ");
}

export function formatError(error: unknown, t?: ErrorTranslator): string {
  if (error instanceof ZodError) {
    return error.issues.map((issue) => formatZodIssue(issue, t)).join(" | ");
  }
  if (error && typeof error === "object") {
    const dbError = error as PostgresError;
    if (dbError.code === "23505") {
      const field = dbError.detail?.match(/\((.*?)\)=/)?.[1] ?? "field";
      return t
        ? t("errors.database.unique", { field })
        : `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    }
    if (typeof dbError.message === "string") return dbError.message;
  }
  if (error instanceof Error) return error.message;
  try {
    return JSON.stringify(error);
  } catch {
    return t ? t("errors.unknown") : "An unexpected error occurred.";
  }
}
