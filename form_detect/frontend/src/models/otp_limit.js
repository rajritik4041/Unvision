import mongoose from "mongoose";

const otpLimitSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true   // 👈 ek email ka ek hi record
  },

  count: {
    type: Number,
    default: 0
  },

  firstRequestTime: {
    type: Date,
    default: Date.now
  },

  lastRequestTime: {
    type: Date,
    default: Date.now
  },

  blockedUntil: {
    type: Date,
    default: null
  }

});

// ⏳ optional TTL (auto cleanup after 1 hour)
otpLimitSchema.index(
  { lastRequestTime: 1 },
  { expireAfterSeconds: 3600 }
);

export default mongoose.models.OtpLimit || mongoose.model("OtpLimit", otpLimitSchema);