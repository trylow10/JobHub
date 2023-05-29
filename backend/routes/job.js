// Libraries
const express = require("express");
const { validateToken } = require("../helper/token");
const { signature } = require("../crypto/functions");
const Job = require("../schema/job");

const Router = express.Router();

// Create a new job
Router.post("/", validateToken, async (req, res) => {
  const userId = req.body.activeSessionId;
  const responce = {};

  const job = new Job({
    _id : userId,
    title: req.body.title,
    description: req.body.description,
    company: req.body.company,
    workPlace: req.body.workPlace,
    jobLocation: req.body.jobLocation,
    jobType: req.body.jobType,
    skills: req.body.skills
  });

  try {
    const newJob = await job.save();
    responce.success = true;
    responce.msg = "Job created successfully";
    res.status(201).json({ ...responce, signature: signature(responce) });
  } catch (error) {
    console.log(error);
    responce.success = false;
    responce.msg = "Job creation failed";
    res.status(400).json({ ...responce, signature: signature(responce) });
  }
});

Router.put("/update", validateToken, async (req, res) => {
  const responce = {};
  const userId = req.body.activeSessionId;
  try {
    const job = await Job.findById({_id: userId});
    
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.title = req.body.title;
    job.company = req.body.company;
    job.workPlace = req.body.workPlace;
    job.jobLocation = req.body.jobLocation;
    job.jobType = req.body.jobType;
    job.skills = req.body.skills;

    const updatedJob = await job.save();
    responce.success = true;
    responce.msg = "Job updated successfully";
    res.json({ ...responce, signature: signature(responce) });
  } catch (error) {
    console.log("updating job error",error)
    responce.success = false;
    responce.msg = "Job update failed";
    res.status(400).json({ ...responce, signature: signature(responce),error });
  }
});

// Delete a job by ID
Router.delete("/remove", validateToken, async (req, res) => {
  const responce = {};
  const userId = req.body.activeSessionId;

  try {
    const job = await Job.findById({_id:userId});
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    await job.remove();
    responce.success = true;
    responce.msg = "Job deleted successfully";
    res.json({ ...responce, signature: signature(responce) });
  } catch (error) {
    console.log(error);
    responce.success = false;
    responce.msg = "Job deletion failed";
    res.status(500).json({ ...responce, signature: signature(responce) });
  }
});

Router.get("/allJobs", validateToken, async (req, res) => {
  let responce = {};
  try {
    const jobs = await Job.find();
    if (jobs.length === 0) {
      return res.status(404).json({ message: "No jobs found" });
    }
    responce.success = true;
    responce.message = "All Jobs";
    responce.jobs = jobs; // Include the jobs in the responce
    res.json({ ...responce, signature: signature(responce) });
  } catch (error) {
    console.log(error);
    responce.success = false;
    responce.message = "Job retrieval failed";
    res.status(500).json({ ...responce, signature: signature(responce) });
  }
});


module.exports = Router;
