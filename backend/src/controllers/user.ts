import getJWTToken from "../middleware/Authentication";
import User from "../models/user";
import { decryptPassword, encryptPassword } from "../utils/encryptionUtils";

export const register = async (req: any, res: any) => {
  try {
    const { username, password, role } = req.body;

    // Check if the email already exists
    const existingUser = await User.findOne({ username });
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
      username,
      password: encryptedPassword,
      role,
    });
    await newUser.save();
    const token = await getJWTToken({
      id: newUser._id,
      username: newUser.username,
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
    const { username, password } = req.body;
    const user = await User.findOne({ username });
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
      email: user.username,
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
