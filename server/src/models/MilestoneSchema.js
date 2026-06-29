import mongoose, { Schema } from "mongoose";

const MilestoneSchema = new Schema({
  title: { type: String, required: true },
  project: { type: Schema.Types.ObjectId, ref: "Project", required: true },
  tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  status: {
    type: String,
    enum: ["pending", "in-progress", "completed"],
    default: "pending",
  },
  progress: { type: Number, default: 0, min: 0, max: 100 },
}, { timestamps: true });

// calculate progress based on tasks
MilestoneSchema.methods.calculateProgress = async function() {
  if (!this.tasks || this.tasks.length === 0) {
    this.progress = 0;
    return 0;
  }

  // get all tasks for milestone
  const tasks = await mongoose.model("Task").find({ _id: { $in: this.tasks } });
  const totalTasks = tasks.length;
  // get tasks with "completed" status
  const completedTasks = tasks.filter(t => t.status === "completed").length;

  // calculate progress as percentage
  this.progress = Math.round((completedTasks / totalTasks) * 100);

  if (this.progress === 100) {
    this.status = 'completed';
  }
  if (this.progress > 0 && this.progress < 100) {
    this.status = 'in-progress';
  }
  if (this.progress === 0) {
    this.status = 'pending';
  }

  return this.progress;
};

// Auto-update progress before save
MilestoneSchema.post('save', async function() {
  const Project = mongoose.model("Project");

  const project = await Project.findById(this.project);

  if (project) {
    await project.calculateProgress();
    await project.save();
  }
});

const Milestone = mongoose.model("Milestone", MilestoneSchema);

export default Milestone;
