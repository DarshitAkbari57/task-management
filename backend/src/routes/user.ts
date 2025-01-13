import express from "express";
import { getAll, login, me, register, updateUser } from "../controllers/user";

const router = express.Router();

// Routes
router.post("/register", register);
router.post("/login", login);
router.get("/me", me);
router.get("/all", getAll);
router.put("/users/:id", updateUser);

export default router;
