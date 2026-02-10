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

    if (project.user.toString() !== user) {
      return res.status(403).json({
        error: "unauthorized creation"
      })
    }
    // ownership ends

    const data_to_save = new Task({
      title: title,
      project: projectId
    })

    await data_to_save.save();

    res.status(201).json({
      message: "Task created successfully",
      task: data_to_save
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
});

router.get('/:projectId', authMiddleware, async function (req, res, next) {
  // i will add seach query here
  try {

    const { projectId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const user = req.user.userId;

    // ownership starts
    const project = await Project.findOne({
      _id: projectId,
      user
    });
    if (!project) {
      return res.status(404).json({
        error: "project dont exist!"
      })
    }
    // ownership ends

    // query starts here
    const query = {};
    if (req.query.status) {
      query.status = req.query.status;
    }
    if (req.query.title) {
      if (req.query.title.length > 50) {
        return res.status(400).json({ error: "Title too long" });
      }
      query.title = { $regex: `^${req.query.title}`, $options: "i" };
    }

    /**I can also add date query later */
    // query ends here

    const result = await Task.find({
      project: projectId,
      ...query
    });

    res.status(200).json({
      result
    })
  } catch (error) {
    res.status(500).json({
      error: "Server failed"
    })
  }
});





















router.delete('/:projectId/:taskId', authMiddleware, async function (req, res, next) {
  try {
    const { projectId, taskId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: "Invalid task ID" });
    }

    // this beautiful thing
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const user = req.user.userId;

    // ownership starts
    const project = await Project.findOne({
      _id: projectId,
      user
    });
    if (!project) {
      return res.status(404).json({
        error: "Project not found or unauthorized"
      })
    }
    // ownership ends
    const result = await Task.findOneAndDelete({
      _id: taskId,
      project: projectId
    });

    if (!result) {
      return res.status(404).json({
        message: "Resource not found"
      });
    }

    res.status(200).json({
      message: `'${result.title}' is deleted successfully`
    });
  } catch (error) {
    res.status(500).json({
      error: "Server failed"
    })
  }
});












router.patch("/:projectId/:taskId", authMiddleware, async (req, res) => {
  try {
    const { title, comment, status } = req.body;
    const { projectId, taskId } = req.params;

    // validating project and task id start...
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }
    if (!mongoose.Types.ObjectId.isValid(taskId)) {
      return res.status(400).json({ error: "Invalid project ID" });
    }
    // validating project and task id start

    // this obj for executing to update
    const updateData = {};

    // validation and adding updateData obj. start here
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

    if (status !== undefined) {
      if (typeof status !== "string") {
        return res.status(400).json({ error: "Invalid status field" });
      }
      updateData.status = status;
    }
    // validation and adding updateData obj. start here

    // beautiful
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    // ownership starts 
    const isOwner = await Project.findOne(
      { _id: projectId, user: req.user.userId }
    );
    if (!isOwner) {
      return res.status(403).json({
        error: "Project not found or unauthorized"
      })
    }
    // owner ends

    const updatedTask = await Task.findOneAndUpdate(
      { _id: taskId, project: projectId },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedTask) {
      return res
        .status(404)
        .json({ error: "task not found" });
    }

    //! final success response
    res.status(200).json({
      message: "Task updated successfully",
      updatedTask,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router
