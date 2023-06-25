// Libraries
const express = require("express");
const { validateToken } = require("../helper/token");
const { signature } = require("../crypto/functions");
const Job = require("../schema/job");
const User = require("../schema/users")
const responseMiddleware = require("../helper/responseMiddleware");
const router = express.Router();
router.use(responseMiddleware);

router.post("/create", validateToken, async (req, res) => {
  const userId = req.body.activeSessionId;
  const response = {};

  try {
    const user = await User.findById(userId);
    if (!user) {
      response.success = false;
      response.message = "User not found";
      return res.customError(404, { ...response, signature: signature(response) });
    }

    // if (!user.roles.includes("jobPoster")) {
    //   // Add "jobPoster" role to the user
    //   user.roles.push("jobPoster");
    //   await user.save();
    // }

    const job = await Job.create({
      ...req.body,
      jobPoster: userId,
    });

    console.log(req.body)
    response.success = true;
    response.message = "Job created successfully";
    res.status(201).customJson({ ...response, signature: signature(response) });
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = "Job creation failed";
    res.status(400).customJson({ ...response, signature: signature(response) });
  }
});
// Get all jobs
router.get("/allJobs", validateToken, async (req, res) => {
  let response = {};

  try {
    const jobs = await Job.find().populate("jobPoster");

    if (jobs.length === 0) {
      response.message = "No jobs found";
      return res.status(404).customJson({ ...response });
    }

    response.success = true;
    response.message = "All Jobs";
    response.jobs = jobs;
    res.customJson({ ...response, signature: signature(response) });
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = "Job retrieval failed";
    res.status(500).customJson({ ...response, signature: signature(response) });
  }
});

//get recommended jobs
router.get("/recommendedJobs", validateToken, async (req, res) => {
  const userId = req.body.activeSessionId;
  let response = {};

  try {
    const user = await User.findById(userId);
    if (!user) {
      response.message = "User not found";
      return res.status(404).json({ ...response });
    }

    const userSkills = user.skills;
    const jobs = await Job.find({ skills: { $all: userSkills } });

    response.success = true;
    response.message = "Recommended jobs for the user";
    response.jobs = jobs;
    res.json({ ...response });
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = "Failed to retrieve recommended jobs";
    res.status(500).json({ ...response });
  }
});

// Get jobs posted by user's followers
router.get("/followersJobs", validateToken, async (req, res) => {
  const userId = req.body.activeSessionId;
  let response = {};

  try {
    const user = await User.findById(userId).populate("followers");

    if (!user) {
      response.success = false;
      response.message = "User not found";
      return res.customError(404, { ...response, signature: signature(response) });
    }

    const followerIds = user.followers.map((follower) => follower._id);

    const jobs = await Job.find({ jobPoster: { $in: followerIds } });

    response.success = true;
    response.message = "Jobs posted by user's followers";
    response.jobs = jobs;
    res.customJson({ ...response, signature: signature(response) });
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = "Failed to retrieve jobs";
    res.status(500).customJson({ ...response, signature: signature(response) });
  }
});

// Get a specific job by ID
router.get("/:jobId", validateToken, async (req, res) => {
  const jobId = req.params.jobId;
  let response = {};

  try {
    const job = await Job.findById(jobId).populate("jobPoster");

    if (!job) {
      response.message = "Job not found";
      return res.status(404).customJson({ ...response });
    }

    response.success = true;
    response.message = "Job details";
    response.job = job;
    res.customJson({ ...response, signature: signature(response) });
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = "Failed to retrieve job details";
    res.status(500).customJson({ ...response, signature: signature(response) });
  }
});

// Update a job by ID
router.put("/:jobId", validateToken, async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.body.activeSessionId; // Assuming the user ID is available in the request body
  const response = {};

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      response.success = false;
      response.message = "Job not found";
      return res.status(404).customJson({ ...response, signature: signature(response) });
    }

    // Check if the user is the job poster
    if (job.jobPoster.toString() !== userId) {
      response.success = false;
      response.message = "Unauthorized access";
      return res.status(403).customJson({ ...response, signature: signature(response) });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      jobId,
      { ...req.body },
      { new: true }
    );

    response.success = true;
    response.message = "Job updated successfully";
    response.job = updatedJob;
    res.customJson({ ...response, signature: signature(response) });
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = "Failed to update job";
    res.status(500).customJson({ ...response, signature: signature(response) });
  }
});


router.delete("/:jobId", validateToken, async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.body.activeSessionId;
  const response = {};

  try {
    const job = await Job.findById(jobId);

    if (!job) {
      response.message = "Job not found";
      return res.status(404).customJson({ ...response });
    }

    if (job.jobPoster.toString() !== userId) {
      response.success = false;
      response.message = "You are not authorized to delete this job";
      return res.status(401).customJson({ ...response });
    }

    // Delete the job
    await job.remove();

    response.success = true;
    response.message = "Job deleted successfully";
    res.customJson({ ...response, signature: signature(response) });
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = "Failed to delete job";
    res.status(500).customJson({ ...response, signature: signature(response) });
  }
});

router.get("/jobs", validateToken, async (req, res) => {
  const userId = req.user.id;
  let response = {};

  try {
    const jobs = await Job.find({ jobPoster: userId });

    response.success = true;
    response.message = "User's jobs";
    response.jobs = jobs;
    res.customJson({ ...response, signature: signature(response) });
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = "Failed to retrieve user's jobs";
    res.status(500).customJson({ ...response, signature: signature(response) });
  }
});


module.exports = router;
