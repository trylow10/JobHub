// Libraries
const express = require("express");
const { validate } = require("email-validator");

const signature = require("../crypto/functions").signature;
const Verify = require("../schema/verification");
const Job = require("../schema/job");

const Router = express.Router();


// Create a new job
Router.post("/verify", async (req, res) => {
    const responce = {};
    const job = new Job({
    title: req.body.title,
    company: req.body.company,
    workPlace: req.body.workPlace,
    jobLocation: req.body.jobLocation,
    jobType: req.body.jobType,
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

  Router.put("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    job.title = req.body.title;
    job.company = req.body.company;
    job.workPlace = req.body.workPlace;
    job.jobLocation = req.body.jobLocation;
    job.jobType = req.body.jobType;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a job by ID
Router.delete("/:id", async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    await job.remove();
    res.json({ message: "Job deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



// return res.json({ ...responce, signature: signature(responce) });
module.exports = Router;

