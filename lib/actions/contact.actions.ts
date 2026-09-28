"use server";

import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { contactSchema } from "@/lib/validations";
import { formatZodIssues, withAction } from "@/lib/utils";
import type { ActionResult } from "@/types";

export async function submitContactAction(
  input: unknown,
): Promise<ActionResult<{ id: string }>> {
  const t = await getTranslations();
  const parsed = contactSchema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: { type: "zod", issues: formatZodIssues(parsed.error, t) },
      message: t("actions.contact.invalidForm"),
    };
  }

  return withAction(
    async () => {
      const id = crypto.randomUUID();
      await db.insert(contactMessages).values({ id, ...parsed.data });
      return { id };
    },
    { name: "contact.submit", successMessage: t("actions.contact.success") },
  );
}
