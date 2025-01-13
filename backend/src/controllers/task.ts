import Task from "../models/task";
import { Request, Response, NextFunction } from "express";

export const createTask = async (req: any, res: Response, io: any) => {
  try {
    const { title, description, assignedTo, deadline } = req.body;

    const newTask = new Task({
      title,
      description,
      assignedTo,
      deadline,
      createdBy: req.user._id,
    });

    await newTask.save();

    const taskList = await Task.find({ assignedTo: req.user._id });

    // Emit a socket event to notify clients of the new task
    io.emit("taskUpdated", { message: "add new Task", data: taskList });

    res.status(201).json({
      status: 201,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({
      status: 500,
      message: "Error creating task",
      data: error,
    });
  }
};

export const updateTask = async (req: any, res: any, io: any) => {
  try {
    const { taskId } = req.params;
    const updates = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({
        status: 404,
        message: "Task not found",
        data: null,
      });
    }

    // Emit the updated task data
    io.emit("taskUpdated", { message: "update Task", data: updatedTask });

    res.status(200).json({
      status: 200,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error updating task",
      data: error,
    });
  }
};

export const getTasks = async (req: any, res: Response) => {
  try {
    const userId = req.user._id;
    const { id } = req.query;

    // Build the filter object
    let filter: any = {};

    // If status is passed, add it to the filter
    if (id && id !== "all") {
      filter.assignedTo = id;
    }

    // Fetch tasks based on filter
    const tasks = await Task.find(filter)
      .populate("assignedTo")
      .populate("createdBy");

    res.status(200).json({
      status: 200,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error retrieving tasks",
      data: error,
    });
  }
};

export const getMyTasks = async (req: any, res: Response) => {
  try {
    const tasks = await Task.find({ createdBy: req.user._id })
      .populate("assignedTo", "username role")
      .populate("createdBy", "username role");

    res.status(200).json({
      status: 200,
      message: "Tasks retrieved successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error retrieving tasks",
      data: error,
    });
  }
};

export const getTaskById = async (req: any, res: any) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId)
      .populate("assignedTo", "username role")
      .populate("createdBy", "username role");

    if (!task) {
      return res.status(404).json({
        status: 404,
        message: "Task not found",
        data: null,
      });
    }

    res.status(200).json({
      status: 200,
      message: "Task retrieved successfully",
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error retrieving task",
      data: error,
    });
  }
};

export const deleteTask = async (req: any, res: any, io: any) => {
  try {
    const { taskId } = req.params;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).json({
        status: 404,
        message: "Task not found",
        data: null,
      });
    }

    // Emit the deleted task data
    io.emit("taskDeleted", { message: "Delete Task", data: deletedTask });

    res.status(200).json({
      status: 200,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error deleting task",
      data: error,
    });
  }
};

export const updateTaskStatus = async (req: any, res: any, io: any) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!["Pending", "In Progress", "Completed"].includes(status)) {
      return res.status(400).json({
        status: 400,
        message: "Invalid status value",
        data: null,
      });
    }

    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        status: 404,
        message: "Task not found",
        data: null,
      });
    }
    // Emit a socket event to notify clients of the new task
    io.emit("taskUpdated", {
      message: "Task Status Update",
      data: updatedTask,
    });

    res.status(200).json({
      status: 200,
      message: "Task status updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Error updating task status",
      data: error,
    });
  }
};
