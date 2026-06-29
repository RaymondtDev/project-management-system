import express from "express";
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  updateProjectStatus,
} from "../controllers/projectController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// get all projects
router.get("/", authenticateAdmin, getProjects);
// create a new project
router.post("/", authenticateAdmin, createProject);
// get project by id
router.get("/p", authenticateAdmin, getProjectById);
// update project
router.put("/p/", authenticateAdmin, updateProject);
// delete project
router.delete("/p/delete", authenticateAdmin, deleteProject);
// update project status
router.put("/p/update", authenticateAdmin, updateProjectStatus);

export default router;
