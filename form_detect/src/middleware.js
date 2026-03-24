import { NextResponse } from 'next/server' ;
export function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublicPath =
        path === "/login" ||
        path === "/" ||
        path === "/signup" ||
        path === "/aboutus" ||
        path === "/reviews" ||
        path === "/contactus" ||
        path === "/opertunities";
    const token = request.cookies.get("token")?.value || '';

    // ✅ Agar user logged in hai aur public page pe ja raha hai
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    // ✅ Agar user logged in nahi hai aur private page pe ja raha hai
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    const response = NextResponse.next();
    response.headers.set("Cache-Control", "no-store, must-revalidate");

    return response;
}

export const config = {
    matcher: [
        "/",
        "/profile",
        "/login",
        "/signup",
        "/aboutus",
        "/reviews",
        "/contactus",
        "/opertunities",
    ],
};


// src/middleware.js

// import { NextResponse } from "next/server";
// import { verifyToken } from "./lib/auth";

// export function middleware(req) {

//     const jwtToken = req.cookies.get("token")?.value;
//     const nextAuthToken =
//         req.cookies.get("next-auth.session-token") ||
//         req.cookies.get("__Secure-next-auth.session-token");
//     const user = verifyToken(jwtToken) || nextAuthToken;
//     const path = req.nextUrl.pathname;

//     if (user && path === "/") {
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//     }

//     if (!user && path.startsWith("/dashboard")) {
//         return NextResponse.redirect(new URL("/login", req.url));
//     }

//     return NextResponse.next();
// }

// export const config = {
//     matcher: ["/", "/dashboard/:path*"]
// };

