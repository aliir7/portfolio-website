"use server";

import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { formatError } from "@/lib/utils";
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
      fieldErrors: Object.fromEntries(
        parsed.error.issues.map((issue) => [
          String(issue.path[0] ?? "form"),
          [issue.message],
        ]),
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
      await auth.api.signOut({ headers: await headers() });
      return { error: t("actions.auth.notAdmin") };
    }
  } catch (error) {
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
  await auth.api.signOut({ headers: await headers() });
  redirect("/login");
}
