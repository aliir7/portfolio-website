import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { withLocale } from "@/lib/utils/locale";

export async function getCurrentSession() {
  return auth.api.getSession({ headers: await headers() });
}

export async function requireSession() {
  const session = await getCurrentSession();
  if (!session?.user) {
    redirect(await withLocale("/login"));
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

/** For guest-only pages (login): a signed-in admin goes straight to the panel. */
export async function redirectIfAdmin() {
  const session = await getCurrentSession();
  if (session?.user.role === "admin") {
    redirect("/admin");
  }
}
