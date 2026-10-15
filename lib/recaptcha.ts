import "server-only";

import { env } from "@/lib/env";

/** Shared by Better Auth's captcha plugin and the contact form, so both use the same key and threshold. */
export const recaptchaConfig = {
  secretKey: env.RECAPTCHA_SECRET_KEY,
  minScore: 0.5,
};

type SiteVerifyResponse = { success: boolean; score?: number; action?: string };

/** Verifies a reCAPTCHA v3 token for one named action with Google's siteverify endpoint. */
export async function verifyRecaptcha(token: string, expectedAction: string) {
  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: new URLSearchParams({ secret: recaptchaConfig.secretKey, response: token }),
    cache: "no-store",
  });
  if (!response.ok) return false;

  const result = (await response.json()) as SiteVerifyResponse;
  return result.success && result.action === expectedAction && (result.score ?? 0) >= recaptchaConfig.minScore;
}
