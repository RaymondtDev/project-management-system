import mongoose from "mongoose";
import Admin from "../models/AdimSchema.js";
import Project from "../models/ProjectSchema.js";
import Client from "../models/ClientSchema.js";
import Milestone from "../models/MilestoneSchema.js";
import Task from "../models/TaskSchema.js";

// get all projects
export const getProjects = async (req, res) => {
  try {
    const { admin } = req.query;

    const projects = await Project.find({ admin: admin });

    res.status(200).json({ projects });

  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({ message: "Error fetching projects", error });
  }
};

// create a new project
export const createProject = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    
    const {
      adminId,
      project,
      client,
      milestones
    } = req.body;

    // find admin by id
    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    // create project in database
    const [newProject] = await Project.create(
      [
        {
          admin: adminId,
          title: project.title,
          description: project.description,
          dueDate: project.dueDate,
        },
      ],
      { session }
    );

    // create client for project
    const [projectClient] = await Client.create(
      [
        {
          name: client.name,
          email: client.email,
          project: newProject._id
        },
      ],
      { session }
    );

    // keep track of milestone ids to associate with project later
    const milestoneIds = [];

    // if milestones were provided, create them and associate with project
    if (milestones && milestones.length > 0) {
      for (const milestoneData of milestones) {
        const [milestone] = await Milestone.create(
          [
            {
              title: milestoneData.title,
              project: newProject._id,
            }
          ],
          { session }
        );

        // keep track of milestone ids to associate with project later
        milestoneIds.push(milestone._id);

        // if milestone has tasks, create them
        if (milestoneData.tasks && milestoneData.tasks.length > 0) {
          const tasksToInsert = milestoneData.tasks.map((task) => ({
            title: task.title,
            milestone: milestone._id,
          }));
          
          // insert tasks in bulk
          const insertedTasks = await Task.insertMany(tasksToInsert, { session });
          milestone.tasks = insertedTasks.map(task => task._id);

          await milestone.save({ session });
        }
      }
    }

    // add project to admin projects array
    admin.projects.push(newProject._id);
    await admin.save();

    // associate milestones with project
    newProject.milestones = milestoneIds;
    // associate client with project
    newProject.client = projectClient._id;

    await newProject.save({ session });

    // 5. Commit transaction
    await session.commitTransaction();

    res.status(201).json({
      success: true,
      newProject,
    });

  } catch (error) {

    await session.abortTransaction();

    console.error("Error creating project:", error);
    res.status(500).json({ message: "Error creating project", error });
  } finally {
    session.endSession();
  }
};


// get project by id
export const getProjectById = async (req, res) => {
  try {

    const { id } = req.query;

    // find project by id and get milestones and tasks
    const project = await Project.findById(id)
      .populate([
        { 
          path: "client",
          model: "Client", 
        },
        {
        path: "milestones",
        model: "Milestone",
        populate: {
          path: "tasks",
          model: "Task",
        }
      }]);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ project });

  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({ message: "Error fetching project", error });
  }
};

// update project
export const updateProject = async (req, res) => {
  try {

    const { projectId } = req.params;
    const {
      title,
      description,
      dueDate
    } = req.body;

    // find project by id
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // update project fields
    project.title = title || project.title;
    project.description = description || project.description;
    project.dueDate = dueDate || project.dueDate;

    await project.save();

    res.status(200).json({ message: "Project updated successfully", project });

  } catch (error) {
    console.error("Error updating project:", error);
    res.status(500).json({ message: "Error updating project", error });
  }
};

// delete project
export const deleteProject = async (req, res) => {
  try {

    const { id } = req.query;

    // find project by id and delete
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.status(200).json({ message: "Project deleted successfully" });

  } catch (error) {
    console.error("Error deleting project:", error);
    res.status(500).json({ message: "Error deleting project", error });
  }
};

export const updateProjectStatus = async (req, res) => {
  try {
    const { id } = req.query;
    const { status } = req.body;

    const project = await Project.findById(id);

    if (!project) return res.status(404).json({ message: "Project not found" });

    project.status = status;
    await project.save();

    res.status(200).json({ message: "Project status updated successfully" });
  } catch (error) {
    console.error("Error updating project status:", error);
    res.status(500).json({ message: "Error updating project status", error });
  }
}
