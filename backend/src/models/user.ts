import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: false },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
    permissions: {
      type: [String],
      enum: ["view", "edit", "delete"],
      default: ["view"],
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "modified_at" },
  }
);

const User = mongoose.model("User", userSchema); // No 'new' keyword here

export default User;
