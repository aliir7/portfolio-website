import "server-only";

import { Resend } from "resend";
import { env } from "@/lib/env";

type EmailInput = { to: string; subject: string; html: string; replyTo?: string };

/** The only place that talks to Resend (password reset and contact notifications both use it). */
export async function sendEmail({ to, subject, html, replyTo }: EmailInput) {
  if (!env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured.");

  // Resend resolves with `{ error }` instead of throwing, so surface it explicitly.
  const { error } = await new Resend(env.RESEND_API_KEY).emails.send({
    from: env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
    to,
    subject,
    html,
    replyTo,
  });
  if (error) throw new Error(`Resend failed: ${error.message}`);
}

const htmlEscapes: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escape user-provided text before putting it in an HTML e-mail body. */
export const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => htmlEscapes[char]);
