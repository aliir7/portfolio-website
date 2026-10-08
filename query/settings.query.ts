import "server-only";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { settings } from "@/db/schema";
import type { SettingsMap } from "@/types";
import { withQuery } from "@/lib/utils/with-query";

export function getSettingQuery<K extends keyof SettingsMap>(
  key: K,
): Promise<SettingsMap[K] | null> {
  return withQuery(async () => {
    const [row] = await db
      .select({ value: settings.value })
      .from(settings)
      .where(eq(settings.key, key))
      .limit(1);

    return (row?.value as SettingsMap[K] | undefined) ?? null;
  });
}

export function getSettingsQuery<K extends keyof SettingsMap>(
  keys: readonly K[],
): Promise<Partial<SettingsMap>> {
  return withQuery(async () => {
    if (!keys.length) return {};

    const rows = await db.select({
      key: settings.key,
      value: settings.value,
    }).from(settings);

    return Object.fromEntries(
      rows
        .filter((row) => keys.includes(row.key as K))
        .map((row) => [row.key, row.value]),
    ) as Partial<SettingsMap>;
  });
}
