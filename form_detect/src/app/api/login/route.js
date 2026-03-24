import connectDB from "@/config/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";

export async function POST(req) {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
        return NextResponse.json({
            success: false,
            message: "Email and password required"
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return NextResponse.json({
            success: false,
            message: "Invalid User"
        });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return NextResponse.json({
            success: false,
            message: "Invalid Password"
        });
    }
      const SECRET = process.env.SECRET_KEY || "raghupatiraghavrajaram";
    if (isMatch) {
    const token = jwt.sign(
      { id: user._id, email: user.email },
     SECRET ,
      { expiresIn: "10m" }
    );

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

   response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, 
});

    console.log("COOKIE SET:", token); 

    return response;
  }

}