const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
    trim: true,
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  requirements: {
    type: String,
    required: [true, "Please Enter requirements"],
  },

  documents: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  members: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "User",
     
    },
  ],

  technology: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Technology",
      
    },
  ],
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Project", projectSchema);
