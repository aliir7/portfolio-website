"use server";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  forgotPasswordSchema,
  loginSchema,
  resetPasswordSchema,
} from "@/lib/validations";
import { withLocale } from "@/lib/utils/locale";
import { formatError, formatZodIssues } from "@/lib/utils/format-error";
import { logger } from "@/lib/utils/logger";
import type {
  LoginState,
  PasswordResetState,
  ResetPasswordState,
} from "@/types";

export type { LoginState };

function toFieldErrors(
  issues: { path: PropertyKey[]; message: string }[],
): Record<string, string[]> {
  return issues.reduce<Record<string, string[]>>((acc, issue) => {
    const field = String(issue.path[0] ?? "form");
    acc[field] = [...(acc[field] ?? []), issue.message];
    return acc;
  }, {});
}

export async function signInAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const t = await getTranslations();
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    rememberMe: formData.get("rememberMe") === "true",
  });

  if (!parsed.success) {
    return {
      fieldErrors: toFieldErrors(formatZodIssues(parsed.error, t)),
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
        rememberMe: parsed.data.rememberMe,
      },
      headers: requestHeaders,
    });

    if (!result?.user || result.user.role !== "admin") {
      logger.warn(
        { action: "auth.signIn", reason: "not-admin" },
        "Sign-in rejected",
      );
      await auth.api.signOut({ headers: await headers() });
      return { error: t("actions.auth.notAdmin") };
    }
  } catch (error) {
    logger.error({ action: "auth.signIn", err: error }, "Sign-in failed");
    return {
      error:
        error instanceof Error && error.message
          ? t("actions.auth.invalidCredentials")
          : formatError(error, t),
    };
  }

  redirect("/admin");
}

export async function signOutAction() {
  logger.info({ action: "auth.signOut" }, "Sign-out requested");
  await auth.api.signOut({ headers: await headers() });
  redirect(await withLocale("/login"));
}

export async function requestPasswordResetAction(
  _previousState: PasswordResetState,
  formData: FormData,
): Promise<PasswordResetState> {
  const t = await getTranslations();
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      fieldErrors: toFieldErrors(formatZodIssues(parsed.error, t)),
      error: t("actions.auth.invalidForm"),
    };
  }

  const captchaToken = formData.get("recaptchaToken");
  if (typeof captchaToken !== "string" || !captchaToken) {
    return { error: t("actions.auth.captchaRequired") };
  }

  try {
    const requestHeaders = new Headers(await headers());
    requestHeaders.set("x-captcha-response", captchaToken);

    const result = await auth.api.requestPasswordReset({
      body: {
        email: parsed.data.email,
        redirectTo: `${baseUrl()}${await withLocale("/reset-password")}`,
      },
      headers: requestHeaders,
    });

    if (!result?.status) {
      throw new Error(result?.message ?? t("actions.auth.resetRequestFailed"));
    }
    return { success: t("actions.auth.resetRequested") };
  } catch (error) {
    logger.error(
      { action: "auth.requestPasswordReset", err: error },
      "Password reset request failed",
    );
    return { error: t("actions.auth.resetRequestFailed") };
  }
}

export async function resetPasswordAction(
  _previousState: ResetPasswordState,
  formData: FormData,
): Promise<ResetPasswordState> {
  const t = await getTranslations();
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      fieldErrors: toFieldErrors(formatZodIssues(parsed.error, t)),
      error: t("actions.auth.invalidForm"),
    };
  }

  const token = String(formData.get("token") ?? "");
  if (!token) {
    return { error: t("auth.invalidLink") };
  }

  try {
    await auth.api.resetPassword({
      body: { newPassword: parsed.data.password, token },
      headers: await headers(),
    });
  } catch (error) {
    logger.error({ action: "auth.resetPassword", err: error }, "Reset failed");
    return { error: formatError(error, t) };
  }

  redirect(`${await withLocale("/login")}?reset=success`);
}

function baseUrl() {
  return process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
}
