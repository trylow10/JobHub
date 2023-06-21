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
      return res.customError(404, { success: false, message: "User not found" });
    }

    if (user.role !== "jobSeeker") {
      return res.customError(400, { success: false, message: "Only job seekers can apply for jobs" });
    }

    const existingApplication = await Application.findOne({ job: jobId, user: userId });
    if (existingApplication && ["applied", "rejected", "shortlisted", "matched"].includes(existingApplication.status)) {
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
    

    // const userSkills = user.skills || [];
    // const jobSkills = job.skills || [];

    const { similarity, matchedSkills, status, reason } = cosineSimilarity(job, user);

    if (status === "rejected") {
      return res.customError(400, {
        success: false,
        message: "You do not have the required skills for this job",
        matchedSkills,
        similarity,
        reason,
      });
    }

    const application = await Application.create({
      job: jobId,
      user: userId,
      status: "applied",
    });

    return res.customJson({
      success: true,
      message: "Application submitted successfully",
      application,
      matchedSkills,
      similarity,
      reason,
    });
  } catch (error) {
    console.log(error);
    return res.customError(500, { success: false, message: "Failed to apply for the job" });
  }
});


// Get applicants for a specific job
router.get("/:jobId/applicants", validateToken, async (req, res) => {
  const jobId = req.params.jobId;
  
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      return res.customError(404, { success: false, message: "Job not found" });
    }

    if (job.postedBy !== req.user._id) {
      return res.customError(403, { success: false, message: "Access denied. Only job posters can view applicants" });
    }

    const applications = await Application.find({ job: jobId }).populate("user");

    if (!applications || applications.length === 0) {
      return res.status(404).customJson({ success: false, message: "No applicants found for the job" });
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
    return res.status(500).customJson({ success: false, message: "Failed to retrieve applicants" });
  }
});


// Get matched applicants for a specific job using normal

// router.get("/:jobId/matchApplicants", validateToken, async (req, res) => {
//   const jobId = req.params.jobId;
//   let response = {};

//   try {
//     const job = await Job.findById(jobId);
//     if (!job) {
//       response.message = "Job not found";
//       return res.status(404).json({ ...response });
//     }

//     const jobSkills = job.skills;
//     const applicants = await Application.find({
//       job: jobId,
//       status: "applied",
//     }).populate("user");

//     // Perform matching based on criteria
//     const matchedApplicants = [];
//     applicants.forEach((applicant) => {
//       const userSkills = applicant.user.skills;
//       // Add additional criteria checks here (e.g., experience, education, location)

//       // Perform matching based on skills
//       const matchingSkills = userSkills.filter((skill) =>
//         jobSkills.includes(skill)
//       );

//       if (matchingSkills.length > 0) {
//         matchedApplicants.push(applicant);
//       }
//     });

//     response.success = true;
//     response.message = "Matched applicants for the job";
//     response.applicants = matchedApplicants;
//     res.json({ ...response });
//   } catch (error) {
//     console.log(error);
//     response.success = false;
//     response.message = "Failed to match applicants";
//     res.status(500).json({ ...response });
//   }
// });

// Get matched applicants for a specific job using cosine
router.get("/:jobId/matchApplicants/cosine", validateToken, async (req, res) => {
  const jobId = req.params.jobId;
  let response = {};

  try {
    const job = await Job.findById(jobId);
    if (!job) {
      response.message = "Job not found";
      return res.status(404).customJson(response);
    }

    const applicants = await Application.find({
      job: jobId,
      status: "applied",
    }).populate("user");

    const matchedApplicants = [];
    const rejectedApplicants = [];
    const shortlistedApplicants = [];

    for (const applicant of applicants) {
      const { similarity, matchedSkills, status, reason } = cosineSimilarity(
        job,applicant
      );

      const updatedApplicant = {
        ...applicant.toObject(),
        similarity,
        matchedSkills,
        status,
        reason,
      };

      if (status === "matched") {
        matchedApplicants.push(updatedApplicant);
      } else if (status === "rejected") {
        // Update the status to "rejected"
        applicant.status = "rejected";
        await applicant.save();
        rejectedApplicants.push(updatedApplicant);
      } else {
        shortlistedApplicants.push(updatedApplicant);
      }
    }

    // Sort the shortlisted applicants based on similarity score or matched skills (choose one criterion)
    // Example: Sort by similarity score in descending order
    shortlistedApplicants.sort((a, b) => b.similarity - a.similarity);

    response.success = true;
    response.matchedApplicants = matchedApplicants;
    response.rejectedApplicants = rejectedApplicants;
    response.shortlistedApplicants = shortlistedApplicants;
    res.customJson(response);
  } catch (error) {
    console.log(error);
    response.success = false;
    response.message = "Failed while matching applicants";
    res.status(500).customJson(response);
  }
});


module.exports = router;
