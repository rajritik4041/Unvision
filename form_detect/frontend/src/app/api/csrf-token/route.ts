import { randomBytes } from "crypto";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token: string = randomBytes(32).toString("hex");
    const response = NextResponse.json(
      { csrfToken: token },
      { status: 200 }
    );

    response.cookies.set("csrfToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    return response;

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate token" },
      { status: 500 }
    );
  }
}
