import connectDB from "@/config/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config()

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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return Response.json({
            success: false,
            message: "Invalid Password"
        });
    }
    let token ;
    if (isMatch) {
        token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        return Response.json({
            success: true,
            message: "Login successful",
            token
        });
    }
}