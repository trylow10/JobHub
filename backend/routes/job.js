// Libraries
const express = require("express");
const { validateToken } = require("../helper/token");
const { signature } = require("../crypto/functions");
const Job = require("../schema/job");
const User = require("../schema/users");
const Application = require("../schema/application");
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
      return res.customError(404, {
        ...response,
        signature: signature(response),
      });
    }
    if (!user.roles.includes("jobPoster")) {
      // Add "jobPoster" role to the user
      user.roles.push("jobPoster");
      await user.save();
    }

    const job = await Job.create({
      ...req.body,
      jobPoster: userId,
    });
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
  const userId = req.body.activeSessionId || req.user.id; // Assuming the user ID is available in req.user.id after token validation
  let response = {};

  try {
    // Retrieve all jobs except the ones already applied by the user
    const appliedJobs = await Application.find({ applicant: userId }).distinct(
      "job"
    );
    const jobs = await Job.find({
      _id: { $nin: appliedJobs },
      jobPoster: { $ne: userId }, // Exclude jobs created by the user
    }).populate("jobPoster");

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

router.get("/my-jobs", validateToken, async (req, res) => {
  const userId = req.body.activeSessionId; // Assuming the user ID is available in the request body
  let response = {};

  try {
    const user = await User.findById(userId); // Retrieve the user document based on the user ID
    if (!user) {
      response.success = false;
      response.message = "User not found";
      return res.customJson({ ...response, signature: signature(response) });
    }
    if (!user.roles.includes("jobPoster")) {
      response.success = false;
      response.message = "Unauthorized access";
      return res
        .status(403)
        .customJson({ ...response, signature: signature(response) });
    }

    const jobsWithUsername = await Job.find({ jobPoster: userId });
    const jobs = jobsWithUsername.map((job) => {
      return {
        ...job.toObject(),
        username: user.username, // Add the username field to each job object
      };
    });

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
    const appliedJobs = await Application.find({ applicant: userId }).distinct(
      "job"
    );
    const jobs = await Job.find({
      skills: { $all: userSkills },
      _id: { $nin: appliedJobs },
      jobPoster: { $ne: userId }, // Exclude jobs created by the user
    });

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
    const user = await User.findById(userId);

    if (!user) {
      response.success = false;
      response.message = "User not found";
      return res.customError(404, {
        ...response,
        signature: signature(response),
      });
    }

    const networkIds = user.networks;
    const jobs = await Job.find({
      jobPoster: {
        $nin: [userId], // Exclude jobs created by the user
        $in: networkIds, // Find jobs posted by users in the network
      },
    })
      .populate("jobPoster", "uname") // Populate jobPoster field and select uname
      .exec();

    response.success = true;
    response.message = "Jobs posted by user's network";
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
      return res
        .status(404)
        .customJson({ ...response, signature: signature(response) });
    }

    // Check if the user is the job poster
    if (job.jobPoster.toString() !== userId) {
      response.success = false;
      response.message = "Unauthorized access";
      return res
        .status(403)
        .customJson({ ...response, signature: signature(response) });
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

module.exports = router;
