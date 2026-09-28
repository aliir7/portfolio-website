import { getTranslations } from "next-intl/server";
import type { ActionResult } from "@/types";
import { formatError } from "./format-error";

type ActionContext = {
  successMessage?: string;
  errorMessage?: string;
};

export async function withAction<T>(
  action: () => Promise<T>,
  context: ActionContext = {},
): Promise<ActionResult<T>> {
  try {
    const data = await action();

    return {
      success: true,
      data,
      message: context.successMessage,
    };
  } catch (error) {
    const t = await getTranslations();

    return {
      success: false,
      error: {
        type: "custom",
        message: context.errorMessage ?? formatError(error, t),
      },
    };
  }
}
