import express from "express";
import {
  createMilestone,
  deleteMilestone,
  updateMilestoneStatus,
} from "../controllers/milestoneController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Route to create a new milestone
router.post("/", authenticateAdmin, createMilestone);
// Route to update milestone status
router.put("/:milestoneId/status", authenticateAdmin, updateMilestoneStatus);
router.delete("/m/delete", authenticateAdmin, deleteMilestone);

export default router;

