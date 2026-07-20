import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const authMiddleware = withAuth(
  function middleware(req) {
    // If the path is /admin or starts with /admin/
    if (req.nextUrl.pathname.startsWith("/admin")) {
      // Check if user is admin
      if (req.nextauth.token?.role !== "ADMIN") {
        return NextResponse.redirect(new URL("/account/login?error=unauthorized", req.url));
      }
    }
    
    // Auth route continuation: inject x-pathname for SEO canonicals
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-pathname', req.nextUrl.pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // If it's an auth route, defer to authMiddleware
  const isAuthRoute = path.startsWith("/admin") || 
                      path.startsWith("/account/dashboard") || 
                      path.startsWith("/account/orders") || 
                      path.startsWith("/account/wishlist") || 
                      path.startsWith("/account/profile") || 
                      path.startsWith("/account/settings");
                      
  if (isAuthRoute) {
    return (authMiddleware as any)(req);
  }
  
  // For all other routes, just inject x-pathname
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', req.nextUrl.pathname);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
