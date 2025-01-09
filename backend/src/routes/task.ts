import express from "express";
import {
  createTask,
  updateTask,
  getTasks,
  getTaskById,
  deleteTask,
  updateTaskStatus,
  getMyTasks,
} from "../controllers/task";
import { Request, Response } from "express";

const router = express.Router();

const taskRoutes = (io: any) => {
  router.post("/tasks", (req, res) => createTask(req, res, io));
  router.put("/tasks/:taskId", (req, res) => updateTask(req, res, io));
  router.get("/tasks", getTasks);
  router.get("/tasks/my", getMyTasks);
  router.get("/tasks/:taskId", getTaskById);
  router.delete("/tasks/:taskId", (req, res) => deleteTask(req, res, io));
  router.put("/tasks/:taskId/status", updateTaskStatus);

  return router;
};

export default taskRoutes;
