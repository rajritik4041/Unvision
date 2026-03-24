import connectDB from "@/config/mongodb"
import User from "@/models/user";
import Otp from "@/models/otp";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";


export async function POST(req) {
  await connectDB()
  const body = await req.json()
  const cookieStore = await cookies(); 
  const csrfTokenFromCookie = cookieStore.get("csrfToken")?.value;
  const csrfTokenFromHeader = req.headers.get("csrf-token");
  // console.log("CSRF Token from cookie:", csrfTokenFromCookie);
  // console.log("CSRF Token from header:", csrfTokenFromHeader);
  const { username, email, password, first_name, confirmPassword, last_name, date_of_birth, age, country, state, city, otp } = body
  // console.log(username, email, password, country, state, first_name, last_name, date_of_birth, age, confirmPassword, csrfToken, city, otp, csrfToken);
  if (csrfTokenFromCookie !== csrfTokenFromHeader) {
    return new Response(JSON.stringify({ success: false, message: "Invalid CSRF token" }), {
      headers: { "Content-Type": "application/json" },
      status: 403
    });
  }
  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ success: false, message: "Passwords do not match" }), {
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const otpRecord = await Otp.findOne({ email });
  console.log("OTP Record from DB:", otpRecord.otp);
  if (!otpRecord || otpRecord.otp !== otp) {
    return new Response(JSON.stringify({ success: false, message: "Invalid OTP" }), { 
      headers: { "Content-Type": "application/json" },
      status: 400
    });
  }

  const colection = await User.create({ first_name, last_name, username, email, date_of_birth, age, country, state, city, hashedPassword})
    await Otp.deleteOne({ email });
  return Response.json({
    success: true,
    message: "Signup successful"
  })
}
