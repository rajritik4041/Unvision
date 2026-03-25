// import mongoose from "mongoose";

// const MONGO_URI = process.env.MONGO_URI;

// if (!MONGO_URI) {
//   throw new Error("Please define MONGO_URI");
// }

// // Global cache
// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectDB() {
//   if (cached.conn) {
//     return cached.conn; // already connected 🚀
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(MONGO_URI, {
//       dbName: "test", // optional
//       bufferCommands: false,
//     }).then((mongoose) => mongoose);
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectDB;
import mongoose from "mongoose";
import dns from "dns";

// 🔥 DNS fix (Atlas slow issue)
dns.setServers(["1.1.1.1", "8.8.8.8"]);

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("Please define MONGO_URI");
}

// 🔥 Global cache
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn; // ⚡ already connected
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: "test", // optional
      bufferCommands: false,
    }).then((mongoose) => {
      console.log("MongoDB connected 🚀");
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("MongoDB error ❌", error);
    throw error;
  }

  return cached.conn;
}

export default connectDB;