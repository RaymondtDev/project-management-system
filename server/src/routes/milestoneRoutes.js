import express from "express";
import {
  createMilestone,
  updateMilestoneStatus,
} from "../controllers/milestoneController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Route to create a new milestone
router.post("/", authenticateAdmin, createMilestone);
// Route to update milestone status
router.put("/:milestoneId/status", authenticateAdmin, updateMilestoneStatus);

export default router;

