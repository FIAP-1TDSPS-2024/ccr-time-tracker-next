import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/pesquisa") ||
    request.nextUrl.pathname.startsWith("/tmp");

  const isLoginPage = request.nextUrl.pathname === "/home";

  const isLoggedIn = request.cookies.get("logged")?.value === "true";

  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (isLoginPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/pesquisa", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/pesquisa/:path*", "/tmp/:path*"],
};
