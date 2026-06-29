import { createTask, updateTaskStatus } from "../controllers/taskController.js";
import express from "express";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Route to create a new task
router.post("/", authenticateAdmin, createTask);
// Route to update task status
router.put("/t/update", authenticateAdmin, updateTaskStatus);

export default router;

