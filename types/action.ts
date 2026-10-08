import type { z } from "zod";

export type ActionError =
  | { type: "zod"; issues: z.ZodError["issues"] }
  | { type: "custom"; message: string };

export type ActionResult<T> =
  | { success: true; data?: T; redirectTo?: string; message?: string }
  | { success: false; error: ActionError; redirectTo?: string; message?: string };
