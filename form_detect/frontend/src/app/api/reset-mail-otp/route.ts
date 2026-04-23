import connectDB from "../../../config/mongodb";
import sendLink from "../../../models/send-link";
import sendOtp from "../../../models/send-otp";
import reset_otp_limits from "@/models/reset-otp-limit";
import Users from "../../../models/user"
import { NextRequest, NextResponse } from "next/server";
import nodemailer from 'nodemailer';

type RequestBody = {
    email: string;
    otp: string;
};
let requestCounts: Record<string, { count: number; time: number }> = {};
export async function POST(req: NextRequest) {
    await connectDB()
    const body: RequestBody = await req.json();
    const { email, otp } = body;
    const collection = await Users.findOne({
        email: email.trim().toLowerCase()
    });
    if (!collection) {
        return NextResponse.json({
            success: false,
            message: "Invalid User"
        });
    }
    const name: string = collection.name;

    const now = new Date();
    const LIMIT = 3;
    const WINDOW = 60 * 60 * 1000; // 👈 1 hour

    let record = await reset_otp_limits.findOne({ email });

    if (!record) {
        // 🆕 first request
        await reset_otp_limits.create({
            email,
            count: 1,
            firstRequestTime: now,
            lastRequestTime: now
        });
    } else {

        // 🔒 block check
        if (record.blockedUntil && record.blockedUntil > now) {
            return new Response(JSON.stringify({
                success: false,
                message: "Blocked  thoda wait karo"
            }), { status: 429 });
        }

        const diff = now.getTime() - record.firstRequestTime.getTime();

        if (diff < WINDOW) {
            if (record.count >= LIMIT) {

                // 🔒 block for 1 minute
                record.blockedUntil = new Date(now.getTime() + 60 * 60 * 1000);
                await record.save();

                return new Response(JSON.stringify({
                    success: false,
                     message: "Blocked 🚫 1 hour wait karo"
                }), { status: 429 });
            }

            // ✅ increment
            record.count += 1;
            record.lastRequestTime = now;
            await record.save();

        } else {
            // 🔄 reset window
            record.count = 1;
            record.firstRequestTime = now;
            record.lastRequestTime = now;
            record.blockedUntil = null;
            await record.save();
        }
    }

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
        subject: 'Your One Time Password Code',
        html: `
<div>

    <h1 style="font-size:24px;font-weight:bold;background:limegreen;margin:0;padding:10px;color:white;">
        Unvision
    </h1>

    <h1 style="font-size:24px;font-weight:bold;margin:0;padding:10px;text-align:center;">
        Password Reset OTP
    </h1>

    <p style="margin-top:4px;margin-bottom:6px;">
        Hi ${name},
    </p>

   <p>We received a request to verify your identity.</p>
    <p>Please enter the following One-Time Password OTP :</p>

    <h3 style="margin-top:10px;margin-bottom:10px;font-weight:bold;">
        Please note: This request will expire in 5 minutes.
    </h3>

    <div style="text-align:center;margin:10px;">
        <span style="font-size:24px;font-weight:bold;letter-spacing:5px;background:limegreen;padding:10px 15px;border-radius:25px;color:white;display:inline-block;">
            ${otp}
        </span>
    </div>
      <p style=" margin-top:6px ; margin-bottom:3px ; font-weight:bold ">For security reasons, please do not share this OTP with anyone. We will never ask for your OTP.</p>
       

    <p style="margin-top:15px;">
        This OTP will expire shortly for security reasons.
        Do not share this code with anyone.
    </p>

    <p style="margin-top:5px;">
        If you did not initiate this request, please ignore this email.
    </p>

    <p style="margin-top:15px;">
        Thank you,<br/>Your App Team
    </p>

</div>
`
    });

    const otpRecord = await sendOtp.updateOne(
        { email },
        {
            $set: { otp, createdAt: new Date() }
        },
        { upsert: true }
    );

    if (!otpRecord) {
        return NextResponse.json({
            success: false,
            message: "Server Problem ",
        });
    }


    const response = NextResponse.json({
        success: true,
        message: "Send Succesfully",
    });

    console.log(collection)
    return response
}