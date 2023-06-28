const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["applied", "matched", "rejected", "shortlisted"],
    default: "applied",
  },
  // Other fields related to the application

  cosineSimilarity: {
    type: Object,
    default: [],
  },
});

const Application = mongoose.model("Application", ApplicationSchema);

module.exports = Application;
