import { Schema } from "mongoose";
import mongoose from "mongoose";
import Milestone from "./MilestoneSchema.js";

const TaskSchema = new Schema({
  title: { type: String, required: true },
  milestone: { type: Schema.Types.ObjectId, ref: "Milestone", required: true },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending",
  },
}, { timestamps: true });

TaskSchema.post('save', async function() {
  const milestone = await Milestone.findById(this.milestone);
  
  if (milestone) {
    await milestone.calculateProgress();
    await milestone.save();
  }
});

const Task = mongoose.model("Task", TaskSchema);

export default Task;
