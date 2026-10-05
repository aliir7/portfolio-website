"use server";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { formatError, formatZodIssues } from "@/lib/utils/format-error";
import { logger } from "@/lib/utils/logger";
import type { LoginState, PasswordResetState } from "@/types";
export type { LoginState };

export async function signInAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const t = await getTranslations();
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      fieldErrors: formatZodIssues(parsed.error, t).reduce<Record<string, string[]>>(
        (errors, issue) => {
          const field = String(issue.path[0] ?? "form");
          errors[field] = [...(errors[field] ?? []), issue.message];
          return errors;
        },
        {},
      ),
      error: t("actions.auth.invalidForm"),
    };
  }

  try {
    const requestHeaders = new Headers(await headers());
    const captchaToken = formData.get("recaptchaToken");

    if (typeof captchaToken !== "string" || !captchaToken) {
      return { error: t("actions.auth.captchaRequired") };
    }

    requestHeaders.set("x-captcha-response", captchaToken);

    const result = await auth.api.signInEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
        rememberMe: true,
      },
      headers: requestHeaders,
    });

    if (!result?.user || result.user.role !== "admin") {
      logger.warn({ action: "auth.signIn", reason: "not-admin" }, "Sign-in rejected");
      await auth.api.signOut({ headers: await headers() });
      return { error: t("actions.auth.notAdmin") };
    }
  } catch (error) {
    logger.error({ action: "auth.signIn", err: error }, "Sign-in failed");
    return {
      error:
        error instanceof Error && error.message
          ? t("actions.auth.invalidCredentials")
          : formatError(error),
    };
  }

  redirect("/admin");
}

export async function signOutAction() {
  logger.info({ action: "auth.signOut" }, "Sign-out requested");
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
}

export async function requestPasswordResetAction(
  _previousState: PasswordResetState,
  formData: FormData,
): Promise<PasswordResetState> {
  const t = await getTranslations();
  const email = String(formData.get("email") ?? "").trim();
  const captchaToken = formData.get("recaptchaToken");

  if (!email || !email.includes("@")) {
    return { error: t("actions.auth.invalidEmail") };
  }

  if (typeof captchaToken !== "string" || !captchaToken) {
    return { error: t("actions.auth.captchaRequired") };
  }

  try {
    const requestHeaders = new Headers(await headers());
    requestHeaders.set("x-captcha-response", captchaToken);

    const result = await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${baseUrl()}/reset-password`,
      },
      headers: requestHeaders,
    });

    if (!result?.status) {
      throw new Error(result?.message ?? t("actions.auth.resetRequestFailed"));
    }

    return { success: t("actions.auth.resetRequested") };
  } catch (error) {
    logger.error({ action: "auth.requestPasswordReset", err: error }, "Password reset request failed");
    return { error: t("actions.auth.resetRequestFailed") };
  }
}

function baseUrl() {
  return process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
}
