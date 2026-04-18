import mongoose from "mongoose";

const sendlink = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 5 * 60,
    },
});


export default mongoose.models.SEND_LINK || mongoose.model("SEND_LINK", sendlink);