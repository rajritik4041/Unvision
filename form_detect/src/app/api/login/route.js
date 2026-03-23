import connectDB from "@/config/mongodb";
import User from "@/models/user";


export async function POST(req) {
    await connectDB();
    const body = await req.json()
    const { email, password } = body
    const username = email.split("@")[0]
    console.log(email, password, username)
    const colection = await User.create({ email, password, username })
    if (!colection) {
        return res.render('partials/404', { message: "contact not found" })
    }

    console.log(body)
    return Response.json({
        success: true,
        message: "Login successful"
    })
}
