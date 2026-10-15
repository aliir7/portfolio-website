import "server-only";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { env } from "@/lib/env";

/** Salted hash of the caller's IP (raw IPs are never stored); null when no proxy header carries one. */
export async function getClientIpHash() {
  const requestHeaders = await headers();
  const ip = requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() || requestHeaders.get("x-real-ip");
  if (!ip) return null;
  return createHash("sha256").update(`${ip}:${env.BETTER_AUTH_SECRET}`).digest("hex");
}
