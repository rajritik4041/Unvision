import connectDB from "@/config/mongodb"
import User from "@/models/user";
import Otp from "@/models/otp";
import { csrfToken } from "csurf";
import cookieParser from "cookie-parser";
import { cookies } from "next/headers";


export async function POST(req) {
  await connectDB()
  const body = await req.json()
  const cookieStore = await cookies(); // ✅ correct
  const csrfTokenFromCookie = cookieStore.get("csrfToken")?.value;
  const csrfTokenFromHeader = req.headers.get("csrf-token");
  console.log("CSRF Token from cookie:", csrfTokenFromCookie);
  console.log("CSRF Token from header:", csrfTokenFromHeader);
  const { username, email, password, confirmPassword, first_name, last_name, date_of_birth, age, country, state, city, otp, csrfToken } = body
  console.log(username, email, password, country, state, first_name, last_name, date_of_birth, age, confirmPassword, csrfToken, city, otp, csrfToken);

  const colection = await Otp.create({ email, otp })
  // const colection = await User.create({ username, email, password })
  return Response.json({
    success: true,
    message: "Signup successful"
  })
}
