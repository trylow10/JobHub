const express = require("express");
const { validateToken } = require("../helper/token");
const { signature } = require("../crypto/functions");
const Application = require("../schema/application");
const Job = require("../schema/job");
const User = require("../schema/users");
const { cosineSimilarity } = require("../helper/cosineSimilarity");
const responseMiddleware = require("../helper/responseMiddleware");

const router = express.Router();
router.use(responseMiddleware);

// Apply for a job
router.post("/:jobId/apply", validateToken, async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.body.activeSessionId;
  const { experience, company, workPlace, jobLocation } = req.body;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.customError(404, { success: false, message: "Job not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.customError(404, {
        success: false,
        message: "User not found",
      });
    }

    const existingApplication = await Application.findOne({
      job: jobId,
      user: userId,
    });
    if (
      existingApplication &&
      ["applied", "rejected", "shortlisted", "matched"].includes(
        existingApplication.status
      )
    ) {
      const errorMessage = {
        applied: "You have already applied for this job",
        rejected: "Your application for this job has been rejected",
        shortlisted: "You are already shortlisted for this job",
        matched: "You are already matched for this job",
      }[existingApplication.status];

      return res.customError(400, { success: false, message: errorMessage });
    }

    user.experience = experience;
    user.company = company;
    user.workPlace = workPlace;
    user.jobLocation = jobLocation;
    user.jobType = job.type;

    await user.save();

    const application = await Application.create({
      job: jobId,
      user: userId,
      status: "applied",
    });

    return res.customJson({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    console.log(error);
    return res.customError(500, {
      success: false,
      message: "Failed to apply for the job",
    });
  }
});

// Get applicants for a specific job
router.get("/:jobId/applicants", validateToken, async (req, res) => {
  const jobId = req.params.jobId;
  const userId = req.body.activeSessionId;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.customError(404, { success: false, message: "Job not found" });
    }

    if (job.jobPoster.toString() !== userId.toString()) {
      return res.status(403).customJson({
        success: false,
        message: "Access denied. Only job posters can view applicants",
      });
    }

    const applications = await Application.find({ job: jobId }).populate(
      "user"
    );

    if (!applications || applications.length === 0) {
      return res
        .status(404)
        .customJson({
          success: false,
          message: "No applicants found for the job",
        });
    }

    const applicants = applications.map((application) => application.user);

    return res.customJson({
      success: true,
      message: "Applicants for the job",
      applicants,
      signature: signature({ success: true }),
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .customJson({ success: false, message: "Failed to retrieve applicants" });
  }
});

router.get("/:jobId/cosine", validateToken, async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.customError(404, {
        success: false,
        message: "Job not found",
      });
    }

    const applicants = await Application.find({
      job: jobId,
    }).populate("user");

    for (const applicant of applicants) {
      const { similarity, matchedSkills, status, reason } = cosineSimilarity(
        job,
        applicant
      );

      applicant.cosineSimilarity = {
        similarity,
        matchedSkills,
        status,
        reason,
      };

      applicant.status = status;

      await applicant.save();
    }

    return res.customJson({
      success: true,
      applicants,
    });
  } catch (error) {
    console.log(error);
    return res.customError(500, {
      success: false,
      message: "Failed to match applicants",
    });
  }
});

module.exports = router;
