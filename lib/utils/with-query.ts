import "server-only";

import { getTranslations } from "next-intl/server";
import { formatError } from "./format-error";
import { logger } from "./logger";

export async function withQuery<T>(
  query: () => Promise<T>,
  name = "server-query",
): Promise<T> {
  const startedAt = performance.now();

  try {
    const data = await query();

    logger.debug(
      { query: name, durationMs: Math.round(performance.now() - startedAt) },
      "Server query succeeded",
    );

    return data;
  } catch (error) {
    const durationMs = Math.round(performance.now() - startedAt);
    const t = await getTranslations();

    logger.error(
      { query: name, durationMs, err: error },
      "Server query failed",
    );

    throw new Error(formatError(error, t), { cause: error });
  }
}
