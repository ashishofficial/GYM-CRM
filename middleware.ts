import { NextRequest, NextResponse } from "next/server";

const AUTH_COOKIE = "gym-crm-auth";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/members",
  "/plans",
  "/offers",
  "/invoices",
];

const AUTH_PAGES = new Set(["/login"]);

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = !!request.cookies.get(AUTH_COOKIE)?.value;

  // Root: route based on auth state
  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = hasSession ? "/dashboard" : "/login";
    return NextResponse.redirect(url);
  }

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );

  // Block protected routes if not logged in
  if (isProtected && !hasSession) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    if (pathname !== "/dashboard") {
      url.searchParams.set("from", pathname);
    }
    return NextResponse.redirect(url);
  }

  // Bounce authed users away from auth pages
  if (hasSession && AUTH_PAGES.has(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/members/:path*",
    "/plans/:path*",
    "/offers/:path*",
    "/invoices/:path*",
    "/login",
  ],
};
