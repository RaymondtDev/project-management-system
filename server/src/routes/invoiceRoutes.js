import express from 'express';
import { sendInvoiceEmail } from "../controllers/invoiceController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/send/:projectId", authenticateAdmin, sendInvoiceEmail);

export default router;