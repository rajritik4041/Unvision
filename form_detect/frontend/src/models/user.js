import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, default: true },
  username: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  googleId: { type: String, default: null },
  githubId: { type: String, default: null },
  microsoftId: { type: String, default: null },
  isProfileComplete: { type: Boolean, default: false },
  profilePic: String,
  date_of_birth: { type: Date },
  password: { type: String, default: null },
  token: { type: String, default: null },
  age: { type: Number },
  country: { type: String },
  state: { type: String },
  city: { type: String }
}, { timestamps: true });
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;