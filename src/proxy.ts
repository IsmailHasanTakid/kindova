
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

export function proxy(request: NextRequest) {
    const sessionCookie = getSessionCookie(request);
    const { pathname } = request.nextUrl;

    const protectedRoutes = [
        "/create-event",
        "/manage-events",
        "/joined-events",
    ];

    const authRoutes = [
        "/login",
        "/signup",
    ];

    const isProtectedRoute = protectedRoutes.some(
        (route) =>
            pathname === route || pathname.startsWith(`${route}/`)
    );

    const isAuthRoute = authRoutes.some(
        (route) =>
            pathname === route || pathname.startsWith(`${route}/`)
    );

    // Redirect unauthenticated users
    if (isProtectedRoute && !sessionCookie) {
        return NextResponse.redirect(
            new URL("/login", request.url)
        );
    }

    // Redirect authenticated users
    if (isAuthRoute && sessionCookie) {
        return NextResponse.redirect(
            new URL("/", request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/create-event/:path*",
        "/manage-events/:path*",
        "/joined-events/:path*",
        "/login",
        "/signup",
    ],
};
