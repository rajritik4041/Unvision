import mongoose from "mongoose";

const sendotp = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
    },
});

// ✅ FIXED
export default mongoose.models.SEND_OTP || mongoose.model("SEND_OTP", sendotp);