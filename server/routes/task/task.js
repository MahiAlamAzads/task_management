const express = require("express")
const router = express.Router()
const authMiddleware = require("../../middlewares/isAuthenticate.middleware");
const Task = require("../../model/Task.model");
const mongoose = require("mongoose");
const Project = require("../../model/Project.model");

router.post('/:projectId', authMiddleware, async function (req, res, next) {
  try {
    const { title } = req.body;
    const { projectId } = req.params;
    const user = req.user.userId;

    // validation starts
    if (!title) {
      return res.status(400).json({
        message: "Please, Fill the title"
      });
    }

    if (typeof title !== "string") {
      return res.status(400).json({
        error: "Title must be a string"
      });
    }

    if (title.length > 200) {
      return res.status(400).json({
        error: "Title must be less than 200 characters"
      });
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        error: "Invalid ProjectId"
      });
    }
    // validation ends

    // ownership starts
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({
        error: "project dont exist!"
      })
    }
    // ownership ends


    const data_to_save = new Task({
      title: title,
      project: projectId
    })

    await data_to_save.save();

    res.status(201).json({
      message: "Task created Successfully"
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
});

router.get('/', authMiddleware, async function (req, res, next) {
  try {
    const query = req.query;
    console.log(query);

    const result = await Project.find({ user: req.user.userId })
    res.status(201).json({
      result
    })
  } catch (error) {
    res.status(500).json({
      error: "Server failed"
    })
  }
});

router.delete('/:projectId', authMiddleware, async function (req, res, next) {
  try {
    const { projectId } = req.params;

    // this beautiful thing
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    // we can create a helper function for checking owner
    const existingProject = await Project.findById(projectId);
    if (!existingProject) {
      return res.status(404).json({
        res: "Couldnt Find Project"
      });
    };
    // checking ownership here
    if (existingProject.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Forbidden: you are not the owner" });
    }
    await existingProject.deleteOne();
    res.status(200).json({
      message: `'${existingProject.title}' is deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      error: "Server failed"
    })
  }
});

router.patch("/:projectId", authMiddleware, async (req, res) => {
  try {
    const { title, comment } = req.body;
    const { projectId } = req.params;

    // 1️⃣ Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    // 2️⃣ Build update object safely
    const updateData = {};

    if (title !== undefined) {
      if (typeof title !== "string") {
        return res.status(400).json({ error: "Invalid title field" });
      }
      updateData.title = title;
    }

    if (comment !== undefined) {
      if (typeof comment !== "string") {
        return res.status(400).json({ error: "Invalid comment field" });
      }
      updateData.comment = comment;
    }

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    // 3️⃣ Atomic update + ownership check
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId, user: req.user.userId },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedProject) {
      return res
        .status(404)
        .json({ error: "Project not found or you don't have permission" });
    }

    // 4️⃣ Success response
    res.status(200).json({
      message: "Updated successfully",
      updatedProject,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router
