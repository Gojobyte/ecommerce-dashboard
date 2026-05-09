import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("next-auth.session-token")?.value ||
                request.cookies.get("__Secure-next-auth.session-token")?.value;

  const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isOnAuth = request.nextUrl.pathname.startsWith("/login") ||
                   request.nextUrl.pathname.startsWith("/register");

  if (isOnDashboard && !token) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isOnAuth && token) {
    return NextResponse.redirect(new URL("/dashboard", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
