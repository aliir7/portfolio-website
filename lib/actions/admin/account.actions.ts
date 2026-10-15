"use server";

import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { runAdminAction } from "@/lib/utils/admin-action";
import { changePasswordSchema } from "@/lib/validations";

export async function changePasswordAction(input: unknown) {
  return runAdminAction({
    name: "account.changePassword",
    schema: changePasswordSchema,
    input,
    revalidate: false, // nothing public changes
    messages: { invalid: "actions.account.invalidForm", success: "actions.account.passwordChanged" },
    run: async (data, { t }) => {
      try {
        await auth.api.changePassword({
          body: {
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            revokeOtherSessions: true,
          },
          headers: await headers(),
        });
      } catch (error) {
        if (error instanceof APIError && error.body?.code === "INVALID_PASSWORD") {
          throw new Error(t("actions.account.wrongPassword"));
        }
        throw error;
      }
    },
  });
}
