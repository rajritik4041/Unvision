import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { id } = body;

    if (!id) {
        return NextResponse.json({
            success: false,
            message: "ID required"
        });
    }

    const user = await User.findById(id);

    if (!user) {
        return NextResponse.json({
            success: false,
            message: "User not found"
        });
    }
    const name: string = `${user.first_name} ${user.last_name}`;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'sunilvarma10980@gmail.com',
            pass: 'qqxgxeeipunrmbqf'
        }
    });

    const info = await transporter.sendMail({
        to: user.email,
        subject: "Password Updated",
        html: `
    <div style="font-family:Arial,sans-serif;line-height:1.6;color:#333;">

        <h2 style="background:#4CAF50;color:white;padding:12px;margin:0;">
            Apna Web Tech
        </h2>
        <p style="margin-top:15px;">
            Hello ${name},
        </p>

        <p>
            This email confirms that you've successfully updated your Unvision account password.<br/>
            No further action is required.
        </p>

        <p>
            If you did not authorize this change, please contact 
            <a href="http://localhost:3000/contactus">Unvision Support</a>.
        </p>

        <p style="margin-top:20px;">
            Thanks,<br/>
            <b>Apna Web Tech Team</b>
        </p>

    </div>
    `
    });

    console.log("Email sent:", info.messageId);

    return NextResponse.json({
        success: true,
        message: "Mail sent successfully"
    });
}

// import nodemailer from 'nodemailer';
// import { NextRequest, NextResponse } from "next/server";
// type RequestBody = {
//   id : string;
// };
// export async function POST(req: NextRequest) {
//   const body: RequestBody = await req.json();
//   const { id } = body;
//   if (!id ) {
//     return NextResponse.json({
//       success: false,
//       message: "All fields required"
//     });
//   }
//   console.log("Send rest mail " , id)
// //   console.log("Received OTP request for email:", email);

// //   const transporter = nodemailer.createTransport({
// //     host: 'smtp.gmail.com',
// //     port: 587,
// //     secure: false,
// //     service: 'Gmail',
// //     auth: {
// //       user: 'sunilvarma10980@gmail.com',
// //       pass: 'qqxgxeeipunrmbqf'
// //     }
// //   });



// //   const autoreply = await transporter.sendMail({
// //     to: email,
// //     subject: "We received your message",

// //   });

// //   console.log("Email sent:", autoreply.messageId);
//   return new Response(JSON.stringify({ message: 'Mail Send succesfully' }), {
//     headers: { 'Content-Type': 'application/json' }
//   });
// }   