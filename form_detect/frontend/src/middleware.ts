import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_PATHS = new Set([
  "/",
  "/login",
  "/signup",
  "/aboutus",
  "/about",
  "/reviews",
  "/contactus",
  "/opertunities",
  "/opportunities",
]);

const PROFILE_ROOT = "/profile";
const PROFILE_HOME = "/profile/home";

export async function middleware(request: NextRequest) {
  const tokenFromQuery = (request.nextUrl.searchParams.get("token") ?? "").trim();
  if (tokenFromQuery && tokenFromQuery !== "undefined" && tokenFromQuery !== "null") {
    const response = NextResponse.next();
    response.cookies.set("token", tokenFromQuery, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  }
  console.log("🔥 MIDDLEWARE RUNNING");
  console.log("All Cookies:", request.cookies.getAll());
  console.log("Token Direct:", request.cookies.get("token"));
  console.log("Token Value:", request.cookies.get("token")?.value);

  const path = request.nextUrl.pathname;
  const isPublicPath = PUBLIC_PATHS.has(path);
  const isProfileRoute =
    path === PROFILE_ROOT || path.startsWith(`${PROFILE_ROOT}/`);

  const customToken = (request.cookies.get("token")?.value ?? "").trim();
  console.log("🔥 MIDDLEWARE RUNNING");

  console.log("All Cookies:", request.cookies.getAll());
  console.log("Token Direct:", request.cookies.get("token"));
  console.log("Token Value:", request.cookies.get("token")?.value);

  const nextAuthToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isLoggedIn =
    (customToken !== "" &&
      customToken !== "undefined" &&
      customToken !== "null") ||
    Boolean(nextAuthToken);

  // /profile ko direct profile home par bhejna hai
  if (path === PROFILE_ROOT) {
    return NextResponse.redirect(new URL(PROFILE_HOME, request.url));
  }

  // Logged-in users ko public auth/info pages par na jaane de
  if (isPublicPath && isLoggedIn && !isProfileRoute) {
    return NextResponse.redirect(new URL(PROFILE_HOME, request.url));
  }

  // Logged-out users ko protected profile routes se block kare
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
    "/about",
    "/reviews",
    "/contactus",
    "/opertunities",
    "/opportunities",
    "/profile/:path*",
  ],
};
