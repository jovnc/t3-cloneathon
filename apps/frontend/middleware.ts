import { NextResponse } from "next/server";
import { auth } from "@/server/auth";
import type { NextRequest } from "next/server";

// Define route patterns
const authRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/error",
  "/auth/verify-request",
];

const protectedRoutes = ["/dashboard", "/profile", "/settings", "/admin"];

// Public routes that don't require authentication
const publicRoutes = [
  "/",
  "/about",
  "/contact",
  "/api/auth", // NextAuth API routes
  "/api/trpc", // tRPC API routes
];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Get the session
  const session = await auth();
  const isAuthenticated = !!session?.user;

  // Check if the route is an auth route
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the route is public
  const isPublicRoute = publicRoutes.some((route) => {
    if (route === "/") return pathname === "/";
    return pathname.startsWith(route);
  });

  // Handle API routes - let them pass through
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Handle static files and Next.js internals
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Redirect authenticated users away from auth routes
  if (isAuthenticated && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Redirect unauthenticated users from protected routes to sign-in
  if (!isAuthenticated && isProtectedRoute) {
    const signInUrl = new URL("/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }

  // Allow the request to continue
  return NextResponse.next();
}

export const config = {
  /*
   * Match all request paths except for the ones starting with:
   * - api (API routes)
   * - _next/static (static files)
   * - _next/image (image optimization files)
   * - favicon.ico (favicon file)
   */
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
