import type { z } from "zod";
import fa from "@/messages/fa.json";

type Issue = z.core.$ZodIssue;

/** Looks up a translation key such as "errors.validation.password.minLength" in the Persian messages. */
function lookup(key: string) {
  const value = key.split(".").reduce<unknown>((node, part) => (node as Record<string, unknown> | undefined)?.[part], fa);
  return typeof value === "string" ? value : undefined;
}

/** Persian text for a Zod issue, used by admin forms (the server maps the same issues to translated messages). */
export function adminErrorMessage(issue: Issue): string {
  if (issue.message.startsWith("errors.")) {
    const translated = lookup(issue.message);
    if (translated) return translated;
  }

  switch (issue.code) {
    case "too_small":
      if (issue.origin === "array") return `حداقل ${issue.minimum} مورد لازم است`;
      if (issue.origin === "number" || issue.origin === "int") return `مقدار باید حداقل ${issue.minimum} باشد`;
      return Number(issue.minimum) <= 1 ? "این فیلد الزامی است" : `حداقل ${issue.minimum} کاراکتر لازم است`;
    case "too_big":
      if (issue.origin === "array") return `حداکثر ${issue.maximum} مورد مجاز است`;
      if (issue.origin === "number" || issue.origin === "int") return `مقدار باید حداکثر ${issue.maximum} باشد`;
      return `حداکثر ${issue.maximum} کاراکتر مجاز است`;
    case "invalid_format":
      if (issue.format === "url") return "آدرس معتبر وارد کن (مثلاً https://example.com)";
      if (issue.format === "email") return "ایمیل معتبر نیست";
      return "فرمت واردشده معتبر نیست";
    case "invalid_type":
      return "این فیلد الزامی است";
    case "invalid_value":
      return "مقدار انتخاب‌شده معتبر نیست";
    default:
      return "مقدار واردشده معتبر نیست";
  }
}
