import express from 'express';
import { sendInvoiceEmail, getInvoices, downloadInvoice, getInvoiceByProjectId } from "../controllers/invoiceController.js";
import { authenticateAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", authenticateAdmin, getInvoices);
router.get("/single", authenticateAdmin, getInvoiceByProjectId);
router.post("/send", authenticateAdmin, sendInvoiceEmail);
router.get("/download", authenticateAdmin, downloadInvoice);

export default router;