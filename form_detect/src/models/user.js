// import mongoose from "mongoose";


// const userschema = new mongoose.Schema({
//     first_name:
//     {
//         type: String,
//         required: true
//     },
//     last_name:
//     {
//         type: String,
//         required: true
//     },
//     username:
//     {
//         type: String,
//         required: true,
//         unique: true
//     },
//     email:
//     {
//         type: String,
//         required: true,
//         unique: true
//     },
//     date_of_birth:
//     {
//         type: Date,
//         required: true
//     },
//     age:
//     {
//         type: Number,
//         required: true
//     },
//     country:
//     {
//         type: String,
//         required: true
//     },
//     state:
//     {
//         type: String,
//         required: true
//     },
//     city:
//     {
//         type: String,
//         required: true

//     },
//     hashedPassword:
//     {
//         type: String,
//         required: true

//     }
// })
// const user = mongoose.models.user || mongoose.model("user", userschema);

// export default user;

import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, unique: true, sparse: true },
  email: { type: String, required: true, unique: true },
  token: { type: String, default: null },
  password: { type: String, default: null },
  googleId: { type: String, default: null },
  profilePic: String,
  date_of_birth: { type: Date },
  age: { type: Number },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  isProfileComplete: { type: Boolean, default: false }
}, { timestamps: true });
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;