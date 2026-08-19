import { renderToBuffer } from "@react-pdf/renderer";
import Project from "../models/ProjectSchema.js";
import Invoice from "../models/InvoiceSchema.js";
import { Resend } from "resend";
import { generateInvoicePDF } from "../lib/invoice-pdf.js";

export const sendInvoiceEmail = async (req, res) => {
  try {
    const { projectId } = req.query;
    const project = await Project.findById(projectId)
      .populate({
        path: "client",
        model: "Client"
      });
    const resend = new Resend(process.env.RESEND_API_KEY);
    let invoice;

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.status !== "completed") {
      return res.status(400).json({ message: "Project is not completed yet" });
    }

    const existingInvoice = await Invoice.findOne({ project: project._id });
    if (existingInvoice) {
      invoice = existingInvoice;
    } else {
      invoice = await Invoice.create({
        admin: project.admin._id,
        project: project._id,
        client: project.client._id,
        number: `INV-${Date.now()}`,
        lineItems: [{ description: `Project: ${project.title}`, amount: project.price }],
        total: project.price
      })
    }

    const pdfBuffer = await generateInvoicePDF({ 
      invoice,
      project,
      client: project.client
    });

    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "raymondtdev@gmail.com",
      subject: `Invoice for Project: ${project.title}`,
      html: `<p>Dear ${project.client.name},</p>
            <p>Please find attached the invoice for the completed project: ${project.title}.</p>
            <p>Thank you for your business!</p>`,
      attachments: [
        {
          filename: `Invoice-${invoice.number}.pdf`,
          content: pdfBuffer,
          contentType: "application/pdf"
        }
      ]
    });

    res.status(200).json({ message: "Invoice email sent successfully" });

  } catch (error) {
    console.error("Error sending invoice email:", error);
    res.status(500).json({ message: "Error sending invoice email", error });
  }
}

export const getInvoices = async (req, res) => {
  try {
    const { admin } = req.query;

    const invoices = await Invoice.find({ admin: admin })
      .populate({
        path: "project",
        model: "Project"
      })
      .populate({
        path: "client",
        model: "Client"
      });

    res.status(200).json({ invoices });
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ message: "Error fetching invoices", error });
  }
}
