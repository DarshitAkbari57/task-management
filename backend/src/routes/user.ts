import express from "express";
import { getAll, login, me, register } from "../controllers/user";

const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", me);
router.get("/all", getAll);

export default router;
