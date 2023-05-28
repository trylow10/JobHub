const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
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
  }
});

const Job = mongoose.model('Job', JobSchema);

module.exports = Job;
