import express from "express";
import { login, me, register } from "../controllers/user";

const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", me);

export default router;
