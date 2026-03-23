import mongoose from "mongoose";
import dotenv from "dotenv";
import dns from "dns";
dns.setServers(["1.1.1.1","8.8.8.8"]);

dotenv.config();
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        console.log(uri);
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

export default connectDB;