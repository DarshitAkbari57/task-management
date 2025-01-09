// utils/encryptionUtils.js
import crypto from "crypto-js";

const SECRET_KEY = process.env.CRYPTO_SECRET; // Ensure this key is in your .env file

// Encrypt function
export const encryptPassword = (password: any) => {
  return crypto.AES.encrypt(password, SECRET_KEY as string).toString();
};

// Decrypt function
export const decryptPassword = (encryptedPassword: any) => {
  const bytes = crypto.AES.decrypt(encryptedPassword, SECRET_KEY as string);
  return bytes.toString(crypto.enc.Utf8); // Convert decrypted data to UTF-8
};
