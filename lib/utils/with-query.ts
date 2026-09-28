import "server-only";

import { getTranslations } from "next-intl/server";
import { formatError } from "./format-error";

export async function withQuery<T>(query: () => Promise<T>): Promise<T> {
  try {
    return await query();
  } catch (error) {
    const t = await getTranslations();
    throw new Error(formatError(error, t), { cause: error });
  }
}
