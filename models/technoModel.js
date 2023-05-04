const mongoose = require("mongoose");

const technoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
   
  },
  status: {
    type: String,
    required: [true, "Please Enter Status"],
  },

  images: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },

  resources: [
    {
      type: String,
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Technology", technoSchema);
