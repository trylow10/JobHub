const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    default: 0,
  },
  company: {
    type: String,
    required: true,
  },
  workPlace: {
    type: String,
    enum: ["Onsite", "Remote", "Hybrid"],
  },
  jobLocation: {
    type: String,
  },
  jobType: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship"],
  },
  skills: {
    type: [String],
    default: [],
  },

  jobPoster: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;
