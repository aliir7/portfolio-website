import "server-only";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { settings } from "@/db/schema";
import type { SettingsMap } from "@/types";

export async function getSettingQuery<K extends keyof SettingsMap>(key: K): Promise<SettingsMap[K] | null> {
  const [row] = await db.select({ value: settings.value }).from(settings).where(eq(settings.key, key)).limit(1);
  return (row?.value as SettingsMap[K] | undefined) ?? null;
}

export async function getSettingsQuery<K extends keyof SettingsMap>(keys: readonly K[]): Promise<Partial<SettingsMap>> {
  if (!keys.length) return {};
  const rows = await db.select({ key: settings.key, value: settings.value }).from(settings);
  return Object.fromEntries(
    rows.filter((row): row is typeof row & { key: K } => keys.includes(row.key as K))
      .map((row) => [row.key, row.value]),
  ) as Partial<SettingsMap>;
}
