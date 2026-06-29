import express from "express";
import { createAdmin, adminLogin, logoutAdmin } from "../controllers/adminController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

// route to create new admin
router.post("/create", createAdmin);
// route for admin login
router.post("/login", adminLogin);
// route for admin logout
router.post("/logout", authenticateAdmin, logoutAdmin);

export default router;
