import connectDB from "@/config/mongodb"
import User from "@/models/user";


export async function POST(req) {
   await connectDB()
  const body = await req.json()
  const { username, email, password } = body
  console.log(body)
  const colection = await User.create({ username, email, password })
  return Response.json({
    success: true,
    message: "Signup successful"
  })
}