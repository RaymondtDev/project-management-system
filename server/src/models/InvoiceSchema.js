import mongoose, { Schema } from "mongoose";

const InvoiceSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: "Project", requred: true },
  client: { type: Schema.Types.ObjectId, ref: "Client", requred: true },
  number: { type: String, requred: true },
  status: {
    type: String,
    enum: [ "pending", "paid" ],
    default: "pending"
  },
  lineItems: [{
    description: { type: String, required: true },
    amount: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Invoice = mongoose.model("Invoice", InvoiceSchema);

export default Invoice;