import "server-only";

import { getTranslations } from "next-intl/server";
import type { z } from "zod";
import { requireAdmin } from "@/lib/auth-guard";
import type { ActionResult } from "@/types";
import { formatZodIssues } from "./format-error";
import { revalidatePublicContent } from "./revalidate";
import { withAction } from "./with-action";

type Translate = (key: string, values?: Record<string, string | number>) => string;

type AdminActionOptions<S extends z.ZodType, R> = {
  /** Used for logging, e.g. "projects.create". */
  name: string;
  schema: S;
  input: unknown;
  /** Translation keys under `actions.*`. */
  messages: { invalid: string; success: string };
  run: (data: z.output<S>, ctx: { userId: string; t: Translate }) => Promise<R>;
  /** Set to false for mutations that do not change public content (e.g. password change). */
  revalidate?: boolean;
};

/**
 * The one pipeline every admin mutation goes through:
 * authorize → validate → run (logged, errors mapped) → revalidate the public site.
 */
export async function runAdminAction<S extends z.ZodType, R>({
  name,
  schema,
  input,
  messages,
  run,
  revalidate = true,
}: AdminActionOptions<S, R>): Promise<ActionResult<R>> {
  const session = await requireAdmin();
  const t = (await getTranslations()) as unknown as Translate;
  const parsed = schema.safeParse(input);

  if (!parsed.success) {
    return {
      success: false,
      error: { type: "zod", issues: formatZodIssues(parsed.error, t) },
      message: t(messages.invalid),
    };
  }

  const result = await withAction(() => run(parsed.data, { userId: session.user.id, t }), {
    name,
    successMessage: t(messages.success),
  });

  if (result.success && revalidate) revalidatePublicContent();
  return result;
}
