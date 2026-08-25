import express from "express";
import {
  createMilestone,
  deleteMilestone,
  updateMilestoneTitle,
} from "../controllers/milestoneController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// Route to create a new milestone
router.post("/", authenticateAdmin, createMilestone);
// Route to update milestone status
router.put("/:milestoneId/", authenticateAdmin, updateMilestoneTitle);
router.delete("/:milestoneId/delete", authenticateAdmin, deleteMilestone);

export default router;

