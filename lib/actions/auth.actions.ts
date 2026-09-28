"use server";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { formatError, formatZodIssues } from "@/lib/utils";
import { logger } from "@/lib/utils/logger";
import type { LoginState } from "@/types";

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
    const result = await auth.api.signInEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
        rememberMe: true,
      },
      headers: await headers(),
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
