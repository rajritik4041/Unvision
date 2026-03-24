import connectDB from "@/config/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import { body, validationResult } from "express-validator"
import { error } from "node:console";

export async function POST(req) {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
        return Response.json({
            success: false,
            message: "Email and password required"
        });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return Response.json({
            success: false,
            message: "Invalid User"
        });
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) {
        return Response.json({
            success: false,
            message: "Invalid Password"
        });
    }

    return Response.json({
        success: true,
        message: "Login successful"
    });
}