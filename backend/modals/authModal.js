import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please add  a name "],
  },
  email: {
    type: String,
    rrequired: [true, "please add  an email "],
    unique: true,
  },
  password: { type: String, required: [true, "please add  a password "] },
  resetToken: { type: String },
  resetTokenExpiration: { type: Date },
});

export const User = mongoose.model("User", userSchema);
