import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/i18n/config";
import { resolveLocale } from "@/i18n/routing";

/**
 * Sends un-prefixed public URLs (`/`, `/login`, `/blog/...`, `/works/...`) to their locale-prefixed
 * version using the visitor's saved language.
 *
 * Routing only, on purpose: authorization lives next to the data (`requireAdmin` in the
 * admin layout and in every admin action, `redirectIfAdmin` on the login page), because a
 * session-cookie check in the proxy is optimistic and can be stale.
 */
export function proxy(request: NextRequest) {
  const locale = resolveLocale(request.cookies.get(LOCALE_COOKIE)?.value);

  const url = request.nextUrl.clone(); // keeps the query string (e.g. ?token=...)
  url.pathname = `/${locale}${url.pathname === "/" ? "" : url.pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/", "/login", "/forgot-password", "/reset-password", "/blog/:path*", "/works/:path*"],
};
