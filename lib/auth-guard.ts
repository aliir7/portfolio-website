import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";

export type AuthSession = NonNullable<Awaited<ReturnType<typeof auth.api.getSession>>>;

export async function getCurrentSession() {
  return auth.api.getSession({
    headers: await headers(),
  });
}

export async function requireSession() {
  const session = await getCurrentSession();

  if (!session?.user) {
    redirect("/login");
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireSession();

  if (session.user.role !== "admin") {
    redirect("/");
  }

  return session;
}

/**
 * Use this helper when a resource is owned by a specific user.
 * It returns the authenticated session only when the requested owner
 * matches the current user. Never trust an ownerId supplied by the client
 * without checking it through this helper or an equivalent server-side check.
 */
export async function requireOwnership(ownerId: string) {
  const session = await requireSession();

  if (session.user.id !== ownerId) {
    throw new Error("FORBIDDEN");
  }

  return session;
}

/**
 * Generic ownership assertion for Server Actions and server-side services.
 * Keep the resource lookup on the server, then pass its persisted ownerId.
 */
export async function assertOwnership(ownerId: string) {
  const session = await requireSession();

  if (session.user.id !== ownerId) {
    throw new Error("FORBIDDEN");
  }

  return session;
}

/**
 * Allows the resource owner or an administrator to perform an operation.
 */
export async function requireOwnerOrAdmin(ownerId: string) {
  const session = await requireSession();

  if (session.user.role !== "admin" && session.user.id !== ownerId) {
    throw new Error("FORBIDDEN");
  }

  return session;
}
