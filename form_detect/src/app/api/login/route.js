import connectDB from "@/config/mongodb";
import User from "@/models/user";
import bcrypt from "bcryptjs";


export async function POST(req) {
    await connectDB();
    const body = await req.json()
    const { email, password } = body

    const username = email.split("@")[0]
    console.log(email, password, username)
    const colection = await User.findOne({ email })
    if (!colection) {
        return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), {
            headers: { "Content-Type": "application/json" },
            status: 401
        });
    }
    console.log(colection)
    const storepassword = colection.hashedPassword
    const ismatchpassword = bcrypt.compareSync(password, storepassword)
    if (!ismatchpassword) { 
        console.log("Login failed for user:", ismatchpassword);
        return new Response(JSON.stringify({ success: false, message: "Invalid credentials" }), {
            headers: { "Content-Type": "application/json" },
            status: 401
        });
    }
        
    return Response.json({
        success: true,
        message: "Login successful"
    })
}
