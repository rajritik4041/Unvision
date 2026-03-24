import { NextResponse } from 'next/server'

export function middleware(request) {

    const path = request.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/" || path === "/signup" || path === "/aboutus" || path === "/reviews" || path === "/contactus" || path === "/opertunities";

    const token = request.cookies.get("token")?.value || '';

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/profile", request.url)), NextResponse.redirect(new URL("/profile", request.url)), NextResponse.redirect(new URL("/details", request.url)), NextResponse.redirect(new URL("/contactus", request.url));
    }

    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const response = NextResponse.next();

    response.headers.set("Cache-Control", "no-store, must-revalidate");

    return response;
}


export const config = {
    matcher: ["/", "/profile", "/login", "/signup", "/aboutus", "/reviews", "/contactus", "/opertunities"],
};
