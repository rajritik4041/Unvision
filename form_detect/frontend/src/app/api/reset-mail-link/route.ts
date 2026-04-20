import connectDB from "../../../config/mongodb";
import sendLink from "../../../models/send-link";
import { NextRequest, NextResponse } from "next/server";
// import sendOtp from "../../../models/send-otp";
import Users from "../../../models/user";
import nodemailer from 'nodemailer';

type RequestBody = {
  email: string;
};
export async function POST(req: NextRequest) {
  await connectDB();
  const body: RequestBody = await req.json();
  const { email } = body;
  if (!email) {
    return NextResponse.json({
      success: false,
      message: "Email is required"
    });
  }
  const collection = await Users.findOne({
    email: email.trim().toLowerCase()
  });
  if (!collection) {
    return NextResponse.json({
      success: false,
      message: "Invalid User"
    });
  }
  const id = collection._id;
  const link = `http://localhost:3000/reset-password/${id}`
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
    subject: 'Reset Your Password',
    html: `
<div style="font-family:Arial, sans-serif; line-height:1.6; color:#333;">

  <h1 style="font-size:24px;font-weight:bold;background:limegreen;margin:0;padding:10px;color:white;">
    Unvision
  </h1>

  <h2 style="font-size:22px;font-weight:bold;margin:0;padding:10px;text-align:center;">
    Password Reset Request
  </h2>

  <p style="margin-top:10px;">
    Hi ,
  </p>

  <p>
    We received a request to reset your password. To proceed, click the button below.
    You may be asked to verify your identity before updating your password.
  </p>

  <p style="margin-top:10px;font-weight:bold;">
    Please note: This request will expire in 10 minutes.
  </p>

  <div style="text-align:center;margin:20px 0;">
    <a href="${link}"
       style="font-size:18px;font-weight:bold;background:limegreen;
       padding:12px 20px;border-radius:25px;color:white;
       text-decoration:none;display:inline-block;">
       Reset your password
    </a>
  </div>

  <p style="margin-top:15px; word-break:break-all;">
    Having trouble? Copy and paste this link into your browser:<br/>
    ${link}
  </p>

  <p style="margin-top:5px;">
    If you didn't make this request, no further action is required.
  </p>

  <p style="margin-top:15px;">
    Thank you,<br/>
    Your App Team
  </p>

</div>
`
  });

  const linkRecord = await sendLink.updateOne(
    { email },
    {
      $set: { link, createdAt: new Date() }
    },
    { upsert: true }
  );

  if (!linkRecord) {
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