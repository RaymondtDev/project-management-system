import mongoose, { Schema } from "mongoose";

const ClientSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  },
  { timestamps: true }
);

const Client = mongoose.model("Client", ClientSchema);

export default Client;

