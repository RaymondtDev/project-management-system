import mongoose, { Schema } from "mongoose";
import Milestone from "./MilestoneSchema.js";
import Task from "./TaskSchema.js";
import Client from "./ClientSchema.js";

const ProjectSchema = new Schema({
  // project code for client reference, auto-generated
  title: { type: String, required: true },
  description: { type: String },
  admin: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
  client: { type: Schema.Types.ObjectId, ref: "Client" },
  milestones: [{ type: Schema.Types.ObjectId, ref: "Milestone" }],
  status: {
    type: String,
    enum: ["planning", "active", "on-hold", "completed", "cancelled"],
    default: "planning",
  },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  startDate: { type: Date },
  dueDate: { type: Date },
  completedAt: { type: Date },
}, { timestamps: true });

// calculate progress based on milestones
ProjectSchema.methods.calculateProgress = async function() {
  if (!this.milestones || this.milestones.length === 0) {
    this.progress = 0;
    return 0;
  }

  // get all milestones for project
  const milestones = await mongoose.model("Milestone").find({ _id: { $in: this.milestones } });
  const totalMilestones = milestones.length;

  const totalProgress = milestones.reduce((sum, milestone) => sum + milestone.progress, 0);
  this.progress = Math.round(totalProgress / totalMilestones);

  if (this.progress === 100) {
    this.status = 'completed';
    if (!this.completedAt) this.completedAt = new Date();
  }
  if (this.progress > 0 && this.progress < 100) {
    this.status = 'active';
  }
  if (this.progress === 0) {
    this.status = 'planning';
  }

  return this.progress;
};

// Auto-update progress before save
ProjectSchema.pre('save', async function() {
  if (this.isModified('milestones')) {
    await this.calculateProgress();
  }
});
ProjectSchema.post("findOneAndDelete", async function(doc) {
  if (doc) {
    await Client.deleteMany({ project: doc._id });
    await Milestone.deleteMany({ project: doc._id });
    await Task.deleteMany({ project: doc._id });
  }
});

const Project = mongoose.model("Project", ProjectSchema);

export default Project;
