const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },

  // we add reference with collection name: Projects
  projectsCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

/**
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  // Reference projects
  projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);

visualize:
{
  "_id": "67a7c1f9e4b0f2a1d1234567",
  "email": "mahi@example.com",
  "password": "hashedpassword123",
  "projects": [
    "67a7c20ae4b0f2a1d1234568",
    "67a7c21be4b0f2a1d1234569"
  ],
  "createdAt": "2026-02-08T17:00:00.000Z",
  "updatedAt": "2026-02-08T17:00:00.000Z"
}
 */