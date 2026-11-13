import "server-only";

import { getTranslations } from "next-intl/server";
import { formatError } from "./format-error";
import { logger } from "./logger";

export async function withQuery<T>(query: () => Promise<T>, name = "server-query"): Promise<T> {
  const startedAt = performance.now();
  try {
    const data = await query();
    logger.debug({ query: name, durationMs: Math.round(performance.now() - startedAt) }, "Server query succeeded");
    return data;
  } catch (error) {
    const durationMs = Math.round(performance.now() - startedAt);
    logger.error({ query: name, durationMs, err: error }, "Server query failed");
    // Outside a request (the build, a cached function) there is no locale to translate with:
    // fall back to the raw message so the real cause is never hidden behind a translation error.
    const t = await getTranslations().catch(() => null);
    const message = t ? formatError(error, t) : error instanceof Error ? error.message : "Server query failed";
    throw new Error(message, { cause: error });
  }
}
