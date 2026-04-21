import nodemailer from 'nodemailer';
import Otp from "@/models/otp";
// import connectDB from "@/config/mongodb"
import connectDB from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
type RequestBody = {
    email: string;
    otp: string;
};
export async function POST(req: NextRequest) {
    await connectDB();
    const body: RequestBody = await req.json();
    const { email, otp } = body;
    if (!email || !otp) {
        return NextResponse.json({
            success: false,
            message: "Email and OTP required",
        });
    }
    console.log("Received OTP request for email:", email, "with OTP:", otp);

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        service: 'Gmail',
        auth: {
            user: 'sunilvarma10980@gmail.com',
            pass: 'qqxgxeeipunrmbqf'
        }
    });

    const info = await transporter.sendMail({
        from: 'sunilvarma10980@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        html: `
<div>

    <h1 style="font-size:24px;font-weight:bold;background:limegreen;margin:0;padding:10px;color:white;">
        Unvision
    </h1>
    <h2 style="font-size:22px;font-weight:bold;margin:0;padding:10px;text-align:center;">
        Verify Your Email
    </h2>
    <p style="margin-top:10px;">
        Hello ,
    </p>
    <p>
        Welcome! Thanks for signing up on <b>Unvision</b>.
    </p>
    <p>
        To complete your registration, please verify your email address using the OTP below:
    </p>
    <div style="text-align:center;margin:15px 0;">
        <span style="font-size:26px;font-weight:bold;letter-spacing:6px;background:limegreen;padding:12px 18px;border-radius:25px;color:white;display:inline-block;">
            ${otp}
        </span>
    </div>
 
      <p style=" margin-top:6px ; margin-bottom:3px ; font-weight:bold "> This OTP is valid for 5 minutes. For security reasons, please do not share this OTP with anyone. We will never ask for your OTP.</p>
       
    <p>
        If you did not create an account, you can safely ignore this email.
    </p>
    <p style="margin-top:20px;">
        Thanks,<br/>
        Team Unvision
    </p>
</div>
`
    });

    const collection = await Otp.create({ email, otp });

    console.log("Email sent:", info.messageId);
    return new Response(JSON.stringify({ message: 'OTP sent successfully' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}   