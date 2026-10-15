"use server";

import { and, eq, gte } from "drizzle-orm";
import { after } from "next/server";
import { getTranslations } from "next-intl/server";
import { db } from "@/db";
import { contactMessages } from "@/db/schema";
import { escapeHtml, sendEmail } from "@/lib/email";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { siteUrl } from "@/lib/site";
import { contactSchema, idSchema } from "@/lib/validations";
import { getClientIpHash } from "@/lib/utils/client-ip";
import { logger } from "@/lib/utils/logger";
import { getProfileQuery } from "@/query/content.query";
import { runAdminAction } from "@/lib/utils/admin-action";
import { formatZodIssues } from "@/lib/utils/format-error";
import { withAction } from "@/lib/utils/with-action";
import type { ActionResult } from "@/types";

// Accepted messages per client IP within the window (see ADR-013).
const RATE_LIMIT = { max: 3, windowMs: 60 * 60 * 1000 };

async function notifyOwner({ name, email, message }: { name: string; email: string; message: string }) {
  const profile = await getProfileQuery();
  if (!profile) return;

  await sendEmail({
    to: profile.email,
    replyTo: email,
    subject: `پیام جدید از ${name.replace(/\s+/g, " ")}`,
    html: `
      <div dir="auto" style="font-family: sans-serif; line-height: 1.8">
        <h2>پیام جدید از فرم تماس</h2>
        <p><strong>${escapeHtml(name)}</strong> (${escapeHtml(email)})</p>
        <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
        <p><a href="${siteUrl}/admin/messages">مشاهده در پنل مدیریت</a></p>
      </div>
    `,
  });
}

/** Public: stores a message from the contact form. */
export async function submitContactAction(
  input: unknown,
  recaptchaToken: string,
): Promise<ActionResult<{ id: string }>> {
  const t = await getTranslations();
  const fail = (key: string): ActionResult<{ id: string }> => ({
    success: false,
    error: { type: "custom", message: t(key) },
    message: t(key),
  });

  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: { type: "zod", issues: formatZodIssues(parsed.error, t) },
      message: t("actions.contact.invalidForm"),
    };
  }

  const ipHash = await getClientIpHash();
  if (ipHash) {
    const recent = await db.$count(
      contactMessages,
      and(eq(contactMessages.ipHash, ipHash), gte(contactMessages.createdAt, new Date(Date.now() - RATE_LIMIT.windowMs))),
    );
    if (recent >= RATE_LIMIT.max) return fail("actions.contact.rateLimited");
  }

  if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken, "contact"))) {
    return fail("actions.contact.captchaFailed");
  }

  const result = await withAction(
    async () => {
      const [row] = await db
        .insert(contactMessages)
        .values({ ...parsed.data, ipHash })
        .returning({ id: contactMessages.id });
      return row;
    },
    { name: "contact.submit", successMessage: t("actions.contact.success") },
  );

  // The message is already stored; a failed e-mail must never fail the visitor's request.
  if (result.success) {
    after(() =>
      notifyOwner(parsed.data).catch((error) =>
        logger.error({ action: "contact.notify", err: error }, "Contact notification failed"),
      ),
    );
  }
  return result;
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
