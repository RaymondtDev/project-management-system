import Task from "../models/TaskSchema.js";
import Milestone from "../models/MilestoneSchema.js";

// create a new task for a milestone
export const createTask = async (req, res) => {
  try {
    const { title, milestoneId } = req.body;

    // find milestone by id
    const milestone = await Milestone.findById(milestoneId);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    // create task in database
    const task = new Task({
      title,
      milestone: milestone._id,
    });

    await task.save();

    // add task to milestone's tasks array
    milestone.tasks.push(task._id);
    await milestone.save();

    res.status(201).json({ message: "Task created successfully", task });

  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ message: "Error creating task", error });
  }
}

// update task status
export const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.query;
    const { status } = req.body;

    // find task by id
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // update task status
    task.status = status;
    await task.save();

    res.status(200).json({ message: "Task status updated successfully", task });

  } catch (error) {
    console.error("Error updating task status:", error);
    res.status(500).json({ message: "Error updating task status", error });
  }
}
