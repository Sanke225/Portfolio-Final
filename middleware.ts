import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from "@/lib/admin/session";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protéger toutes les routes /admin/* sauf la page de login
  if (pathname.startsWith("/admin")) {
    const sessionToken = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
    const isAuthenticated = verifyAdminSessionToken(sessionToken);

    if (!isAuthenticated) {
      // Rediriger vers une page de login
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path((?!login|session).*)", // Protéger toutes les API sauf login et session
  ],
};
