import type { ActionResult } from "@/types";
import { formatError } from "./format-error";

type ActionContext = {
  unexpectedErrorMessage?: string;
};

export async function withAction<T>(
  action: () => Promise<T>,
  context: ActionContext = {},
): Promise<ActionResult<T>> {
  try {
    const data = await action();
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: {
        type: "custom",
        message: context.unexpectedErrorMessage ?? formatError(error),
      },
    };
  }
}
