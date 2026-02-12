/**
 * const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["pending", "in-progress", "done"], default: "pending" },

  // Link back to project
  project: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);

visualize:
{
  "_id": "67a7c22ce4b0f2a1d1234570",
  "title": "Design database schema",
  "description": "Define normalized schema for projects and tasks",
  "status": "in-progress",
  "project": "67a7c20ae4b0f2a1d1234568",
  "createdAt": "2026-02-08T17:10:00.000Z",
  "updatedAt": "2026-02-08T17:15:00.000Z"
}
 */
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    comment: {
      type: String,
      maxlength: 500,
    },
    status: {
      type: String,
      enum: ["In-progress", "pending", "done"],
      default: "pending",
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
      index: true, // <-- index for fast project queries
    },
  },
  { timestamps: true }
);

// Optional: index createdAt for sorting tasks by creation time
taskSchema.index({ createdAt: -1 });

// Optional: compound index if you often filter by project + status
taskSchema.index({ project: 1, status: 1 });

module.exports = mongoose.model("Task", taskSchema);
