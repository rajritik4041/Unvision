import { NextResponse } from 'next/server';
import { getToken } from "next-auth/jwt";

export async function middleware(request) {
    const path = request.nextUrl.pathname;

    //  Public routes
    const isPublicPath =
        path === "/login" ||
        path === "/" ||
        path === "/signup" ||
        path === "/aboutus" ||
        path === "/reviews" ||
        path === "/contactus" ||
        path === "/opertunities";

    //  Protected route
    const isProfileRoute = path.startsWith("/profile");

    //  Tokens
    const customToken = request.cookies.get("token")?.value || '';

    const nextAuthToken = await getToken({
        req: request,
        secret: process.env.NEXTAUTH_SECRET,
    });

    //  Boolean auth
    const isLoggedIn = !!(customToken || nextAuthToken);

    // 🔥 Fix /profile → /profile/home
    if (path === "/profile") {
        return NextResponse.redirect(new URL("/profile/home", request.url));
    }

    //  Logged-in user → avoid public pages
    if (isPublicPath && isLoggedIn && !path.startsWith("/profile")) {
        return NextResponse.redirect(new URL("/profile/home", request.url));
    }

    //  Not logged-in → block protected routes
    if (isProfileRoute && !isLoggedIn) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("callbackUrl", path);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        "/",
        "/login",
        "/signup",
        "/aboutus",
        "/reviews",
        "/contactus",
        "/opertunities",
        "/profile/:path*",
    ],
};