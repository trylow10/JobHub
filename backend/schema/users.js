const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  uname: {
    type: String,
    required: true,
  },
  headline: {
    type: String,
    default: "",
  },
  email: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  bgImg: {
    type: String,
    default: "",
  },
  profileImg: {
    type: String,
    default: "",
  },
  followers: {
    type: [String],
    default: [],
  },
  following: {
    type: [String],
    default: [],
  },
  networks: {
    type: [String],
    default: [],
  },
  hashtags: {
    type: [String],
    default: [],
  },
  recommendedPosts: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    default: [],
  },
  networkReqs: {
    type: [String],
    default: [],
  },
  sendReqs: {
    type: [String],
    default: [],
  },
  roles: {
    type: [String],
    default: ['jobSeeker']
  },
  skills: {
    type: [String],
    default: [],
    required:true,
  },
  experience: {
    type: Number,
    default: 0,
  },
  company: {
    type: String
  },
  workPlace: {
    type: String,
    enum: ['Onsite', 'Remote', 'Hybrid']
  },
  jobLocation: {
    type: String
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship', 'Temporary', 'Volunteer']
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
