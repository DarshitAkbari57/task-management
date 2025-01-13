import getJWTToken from "../middleware/Authentication";
import User from "../models/user";
import { decryptPassword, encryptPassword } from "../utils/encryptionUtils";

export const register = async (req: any, res: any) => {
  try {
    const { email, username, password, role } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 400,
        message: "already exists",
        data: null,
      });
    }

    // Encrypt the password
    const encryptedPassword = encryptPassword(password);
    const newUser: any = new User({
      email,
      username,
      password: encryptedPassword,
      role,
    });
    await newUser.save();
    const token = await getJWTToken({
      id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      role: newUser.role,
    });
    res.status(201).json({
      status: 200,
      message: "User registered successfully",
      data: { token: token },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ status: 500, error: "Error registering user" });
  }
};

export const login = async (req: any, res: any) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: 401, error: "Invalid credentials", data: null });
    }
    const decryptedPassword = decryptPassword(user.password);
    if (decryptedPassword !== password) {
      return res.status(400).send({
        status: 400,
        message: "Invalid email or password",
        data: null,
      });
    }
    // Generate JWT token
    const token = await getJWTToken({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });

    res.status(200).json({
      status: 200,
      message: "Login successful",
      data: { user: user, token: token },
    });
  } catch (error) {
    res.status(500).json({ error: "Error logging in user" });
  }
};

export const me = async (req: any, res: any) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    // If no user found
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "information retrieved successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error retrieving user data",
      data: error,
    });
  }
};

export const getAll = async (req: any, res: any) => {
  const userId = req.user._id;

  try {
    const user = await User.find({ role: "User" });

    // If no user found
    if (!user) {
      return res.status(400).json({
        status: 400,
        message: "User not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "information retrieved successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: "Error retrieving user data",
      data: error,
    });
  }
};

export const updateUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { username, email, role, permissions } = req.body;

    // Validate permissions if provided
    if (permissions && !Array.isArray(permissions)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid permissions format. It should be an array.",
        data: null,
      });
    }

    // Find and update the user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { username, email, role, permissions },
      { new: true, runValidators: true }
    );

    // If the user is not found
    if (!updatedUser) {
      return res.status(404).json({
        status: 404,
        message: "User not found.",
        data: null,
      });
    }

    return res.status(200).json({
      status: 200,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({
      status: 500,
      message: "Error updating user.",
      data: error,
    });
  }
};
