import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // If the path is /admin or starts with /admin/
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // Check if user is admin
      if (req.nextauth.token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/account/login?error=unauthorized", req.url));
      }
    }
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/admin/:path*",
    "/account/dashboard/:path*",
    "/account/orders/:path*",
    "/account/wishlist/:path*",
    "/account/profile/:path*",
    "/account/settings/:path*"
  ],
};
