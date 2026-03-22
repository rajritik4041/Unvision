import nodemailer from 'nodemailer';

export async function POST(req) {
    const body = await req.json();
    const { email, otp } = body;
    console.log("Received OTP request for email:", email, "with OTP:", otp);

   
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


    const info  = await transporter.sendMail({
        from: 'rajritik.9236@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}`
    });
    console.log("Email sent:", info.messageId);
    return new Response(JSON.stringify({ message: 'OTP sent successfully' }), {
        headers: { 'Content-Type': 'application/json' }
    });
}   