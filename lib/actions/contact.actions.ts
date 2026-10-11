"use server";

import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { contactSchema, idSchema } from "@/lib/validations";
import { runAdminAction } from "@/lib/utils/admin-action";
import { formatZodIssues } from "@/lib/utils/format-error";
import { withAction } from "@/lib/utils/with-action";
import type { ActionResult } from "@/types";

/** Public: stores a message from the contact form. */
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
      const [row] = await db
        .insert(contactMessages)
        .values(parsed.data)
        .returning({ id: contactMessages.id });
      return row;
    },
    { name: "contact.submit", successMessage: t("actions.contact.success") },
  );
}

const adminMessages = { invalid: "actions.common.invalidForm" };

export async function markContactMessageReadAction(id: string) {
  return runAdminAction({
    name: "contact.markRead",
    schema: idSchema,
    input: id,
    messages: { ...adminMessages, success: "actions.common.saved" },
    run: async (messageId) => {
      await db
        .update(contactMessages)
        .set({ readAt: new Date() })
        .where(eq(contactMessages.id, messageId));
    },
  });
}

export async function deleteContactMessageAction(id: string) {
  return runAdminAction({
    name: "contact.delete",
    schema: idSchema,
    input: id,
    messages: { ...adminMessages, success: "actions.common.deleted" },
    run: async (messageId) => {
      await db.delete(contactMessages).where(eq(contactMessages.id, messageId));
    },
  });
}
