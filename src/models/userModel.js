import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: String,
    avatar: {
      type: String,
      default: process.env.DEFAULT_AVATAR,
    },
    role: {
      type: Number,
      default: 0,
    },
    active: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
export default User;
