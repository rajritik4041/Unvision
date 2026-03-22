import connectDB from "@/config/mongodb";
import User from "@/models/user";


export async function POST(req) {
    await connectDB();
    const body = await req.json()
    const { email, password } = body
    console.log(email, password)
    const colection = await User.create({ email, password })
    if (!colection) {
        return res.render('partials/404', { message: "contact not found" })
    }

    console.log(body)
    return Response.json({
        success: true,
        message: "Login successful"
    })
}
