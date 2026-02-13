const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    comment: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
        index: true
    },
    taskCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
projectSchema.index({ owner: 1, createdAt: -1 });

module.exports = mongoose.model("Project", projectSchema);


/**
 * const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,

  // Link back to user
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  // Reference tasks
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Task" }]
}, { timestamps: true });

module.exports = mongoose.model("Project", projectSchema);

visualize:
{
  "_id": "67a7c20ae4b0f2a1d1234568",
  "name": "Task Management App",
  "description": "Backend refactor project",
  "user": "67a7c1f9e4b0f2a1d1234567",
  "tasks": [
    "67a7c22ce4b0f2a1d1234570",
    "67a7c23de4b0f2a1d1234571"
  ],
  "createdAt": "2026-02-08T17:05:00.000Z",
  "updatedAt": "2026-02-08T17:05:00.000Z"
}
 */