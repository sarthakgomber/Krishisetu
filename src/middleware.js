import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;

  // JWT is in localStorage (client-side only), so we use a cookie as a signal
  // Frontend sets ks_role cookie on login so middleware can read it server-side
  const role = req.cookies.get("ks_role")?.value;
  const token = req.cookies.get("ks_token")?.value;

  const isFarmerRoute = pathname.startsWith("/farmer");
  const isBuyerRoute = pathname.startsWith("/buyer");

  if (!isFarmerRoute && !isBuyerRoute) return NextResponse.next();

  if (!token) {
    return NextResponse.redirect(new URL(`/login?next=${pathname}`, req.url));
  }

  if (isFarmerRoute && role !== "FARMER") {
    return NextResponse.redirect(
      new URL(role === "BUYER" ? "/buyer/dashboard" : "/login", req.url)
    );
  }

  if (isBuyerRoute && role !== "BUYER") {
    return NextResponse.redirect(
      new URL(role === "FARMER" ? "/farmer/dashboard" : "/login", req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/farmer/:path*", "/buyer/:path*"],
};
