import { toast } from "sonner";
import type { ActionResult } from "@/types";
import { getActionErrorMessage } from "./format-error";

/** Shows the server-translated result as a toast; returns whether the action succeeded. */
export function notifyResult(result: ActionResult<unknown>) {
  if (result.success) {
    toast.success(result.message ?? "");
  } else {
    toast.error(result.message ?? getActionErrorMessage(result.error));
  }
  return result.success;
}
