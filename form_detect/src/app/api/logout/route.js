import { NextResponse } from "next/server";

export async function POST() {

    const response = NextResponse.json({
        success: true,
        message: "Logged out"
    });

    //  Properly delete cookie
    response.cookies.set("token", "", {
        httpOnly: true,
        expires: new Date(0),
        path: "/",        
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
    });

    return response;
}