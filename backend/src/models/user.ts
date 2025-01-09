import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

const User = mongoose.model("User", userSchema); // No 'new' keyword here

export default User;
