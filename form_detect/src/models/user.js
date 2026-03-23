import mongoose from "mongoose";


const userschema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const user = mongoose.models.user || mongoose.model("user", userschema);

export default user;