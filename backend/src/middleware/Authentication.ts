import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user";
dotenv.config();

const secretKey = process.env.JWT_SECRET;
const expiresIn = "365d";

function decodeToken(token: any) {
  try {
    const decoded = jwt.decode(token?.replace("Bearer ", "") || "") || {
      id: "",
    };

    if (!decoded || typeof decoded === "string") {
      throw new Error("Invalid token");
    }
    return decoded;
  } catch (error) {
    console.error("Error decoding token");
    return null;
  }
}

export async function getAuthUser(token: any) {
  try {
    const tokenData: any = decodeToken(token);
    return await User.findById(tokenData.id);
  } catch (e) {
    return undefined;
  }
}

function getJWTToken(data: any) {
  const token = `${jwt.sign(data, secretKey as string, { expiresIn })}`;
  return token;
}

export const verifyToken = (token: any) => {
  try {
    return jwt.verify(token, secretKey as string);
  } catch (error) {
    return "Invalid Token";
  }
};

export default getJWTToken;
