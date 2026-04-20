import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from "next/server";
type RequestBody = {
  name: string;
  email: string;
  message: string;
  subject: string;
};
export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();
  const { name, email, message, subject } = body;
  if (!name || !email || !message || !subject) {
    return NextResponse.json({
      success: false,
      message: "All fields required"
    });
  }
  console.log("Received OTP request for email:", email, "with Message :", message, "And my name ", name, "last s subject is : ", subject);

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
    to: 'sunilvarma10980@gmail.com',
    subject: subject,
    html: `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">

    <h2 style="background:#4CAF50;color:white;padding:12px;margin:0;">
      New Contact Message
    </h2>

    <p style="margin-top:15px;">You have received a new message from your website:</p>

    <table style="width:100%;border-collapse:collapse;margin-top:10px;">
      <tr>
        <td style="padding:8px;border:1px solid #ddd;"><b>Name</b></td>
        <td style="padding:8px;border:1px solid #ddd;">${name}</td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #ddd;"><b>Email</b></td>
        <td style="padding:8px;border:1px solid #ddd;">${email}</td>
      </tr>
      <tr>
        <td style="padding:8px;border:1px solid #ddd;"><b>Message</b></td>
        <td style="padding:8px;border:1px solid #ddd;">${message}</td>
      </tr>
    </table>

    <p style="margin-top:15px;">Check and reply as soon as possible.</p>

  </div>
  ` });

  const autoreply = await transporter.sendMail({
    to: email,
    subject: "We received your message",
    html: `
  <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">

    <h2 style="background:#4CAF50;color:white;padding:12px;margin:0;">
      Apna Web Tech
    </h2>

    <p style="margin-top:15px;">Hello ${name},</p>

    <p>
      Thank you for contacting us 🙌<br/>
      We have successfully received your message and our team will get back to you shortly.
    </p>

    <div style="background:#f4f4f4;padding:10px;border-radius:5px;margin:15px 0;">
      <b>Your Message:</b><br/>
      ${message}
    </div>

    <p>
      If your query is urgent, feel free to reply to this email.
    </p>

    <p style="margin-top:20px;">
      Best regards,<br/>
      <b>Apna Web Tech Team</b>
    </p>

  </div>
  `
  });

  console.log("Email sent:", info.messageId);
  return new Response(JSON.stringify({ message: 'Mail Send succesfully' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}   