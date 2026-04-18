import connectDB from "../../../config/mongodb";
import sendLink from "../../../models/send-link";
import sendOtp from "../../../models/send-otp";
import Users from "../../../models/user"
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';


export async function POST(req) {
    await connectDB()
    const body = await req.json();
    const { email } = body;
    const collection = await Users.findOne({
        email: email.trim().toLowerCase()
    });
    const link = `http://localhost:3000/reset-password/${id}`
    if (!collection) {
        return NextResponse.json({
            success: false,
            message: "Invalid User"
        });
    }
    const id = collection. _id ;
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        service: 'Gmail',
        auth: {
            user: 'rajritik.9236@gmail.com',
            pass: 'dhhumufaemzaoyjo'
        }
    });

    const info = await transporter.sendMail({
        from: 'rajritik.9236@gmail.com',
        to: email,
        subject: 'Your One Time Password Code',
        text: `Your Reset Link ${link}`
    });


    const response = NextResponse.json({
        success: true,
        message: "Send Succesfully",
    });

    console.log(collection)
    return response
}