import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/") {
    const locale = request.cookies.get("portfolio-locale")?.value === "en" ? "en" : "fa";
    return NextResponse.redirect(new URL(`/${locale}`, request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/"] };
