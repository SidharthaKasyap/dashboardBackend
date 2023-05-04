const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: "Project",
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
  },
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },

  priority: {
    type: String,
  },
  type: {
    type: String,
  },
  projectName: {
    type: String,
  },

  weight: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("TaskList", taskListSchema);
