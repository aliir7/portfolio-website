import { NextRequest, NextResponse } from "next/server";

const LEGACY_AUTH_PATHS = ["/login", "/forgot-password", "/reset-password"];

function localeFrom(request: NextRequest): "fa" | "en" {
  return request.cookies.get("portfolio-locale")?.value === "en" ? "en" : "fa";
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL(`/${localeFrom(request)}`, request.url));
  }

  // مسیرهای قدیمی auth → نسخه locale‌دار، با حفظ query (مثل ?token=...)
  if (LEGACY_AUTH_PATHS.includes(pathname)) {
    const url = new URL(`/${localeFrom(request)}${pathname}`, request.url);
    url.search = searchParams.toString();
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/forgot-password", "/reset-password"],
};