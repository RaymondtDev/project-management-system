import express from 'express';
import { sendInvoiceEmail, getInvoices } from "../controllers/invoiceController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateAdmin, getInvoices);
router.post("/send", authenticateAdmin, sendInvoiceEmail);

export default router;