import Milestone from "../models/MilestoneSchema.js";
import Project from "../models/ProjectSchema.js";

// create a new milestone for a project
export const createMilestone = async (req, res) => {
  try {
    const { title, projectId } = req.body;

    // find project by id
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // create milestone in database
    const milestone = new Milestone({
      title,
      project: project._id,
    });

    await milestone.save();

    // add milestone to project's milestones array
    project.milestones.push(milestone._id);
    await project.save();

    res.status(201).json({ message: "Milestone created successfully", milestone });

  } catch (error) {
    console.error("Error creating milestone:", error);
    res.status(500).json({ message: "Error creating milestone", error });
  }
}

// update milestone status
export const updateMilestoneStatus = async (req, res) => {
  try {
    const { milestoneId } = req.params;
    const { status } = req.body;

    // find milestone by id
    const milestone = await Milestone.findById(milestoneId);
    if (!milestone) {
      return res.status(404).json({ message: "Milestone not found" });
    }

    // update milestone status
    milestone.status = status;
    await milestone.save();

    res.status(200).json({ message: "Milestone status updated successfully", milestone });

  } catch (error) {
    console.error("Error updating milestone status:", error);
    res.status(500).json({ message: "Error updating milestone status", error });
  }
}