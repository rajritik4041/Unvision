import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },

  last_name: { type: String, default: null }, // ❌ true hata diya

  username: { type: String, unique: true, sparse: true },

  email: { type: String, required: true, unique: true },

  gender: { type: String, default: null }, // ✅ added

  password: { type: String, default: null },

  googleId: { type: String, default: null },
  githubId: { type: String, default: null },
  microsoftId: { type: String, default: null },

  profilePic: { type: String },

  date_of_birth: { type: Date, default: null },

  age: { type: Number, default: null },

  country: { type: String, default: null },
  state: { type: String, default: null },
  city: { type: String, default: null },

  providers: [{ type: String }], // ✅ array add

  token: { type: String, default: null },

  otp: { type: String, default: null }, // ✅ added (important for your flow)

  isProfileComplete: { type: Boolean, default: false },

  last_login: { type: Date, default: Date.now }, // ✅ added

}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;