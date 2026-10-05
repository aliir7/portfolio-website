import { getTranslations } from "next-intl/server";
import type { ActionResult } from "@/types";
import { formatError } from "./format-error";
import { logger } from "./logger";

type ActionContext = {
  name?: string;
  successMessage?: string;
  errorMessage?: string;
};

export async function withAction<T>(
  action: () => Promise<T>,
  context: ActionContext = {},
): Promise<ActionResult<T>> {
  const startedAt = performance.now();
  const actionName = context.name ?? "server-action";

  try {
    const data = await action();
    logger.info({ action: actionName, durationMs: Math.round(performance.now() - startedAt) }, "Server action succeeded");
    return { success: true, data, message: context.successMessage };
  } catch (error) {
    const durationMs = Math.round(performance.now() - startedAt);
    const t = await getTranslations();
    logger.error({ action: actionName, durationMs, err: error }, "Server action failed");
    return {
      success: false,
      error: { type: "custom", message: context.errorMessage ?? formatError(error, t) },
    };
  }
}
