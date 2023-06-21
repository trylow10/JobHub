function cosineSimilarity(job, applicant) {
  const jobSkills = job.skills || [];
  const userSkills = applicant.user.skills || [];
  const jobExperience = job.experience || 0;
  const jobCompany = job.company || "";
  const jobWorkPlace = job.workPlace || "";
  const jobLocation = job.jobLocation || "";
  const jobType = job.jobType || "";

  const userExperience = applicant.user.experience || 0;
  const userCompany = applicant.user.company || "";
  const userWorkPlace = applicant.user.workPlace || "";
  const userLocation = applicant.user.jobLocation || "";
  const userJobType = applicant.user.jobType || "";

  const fields = [
    "skills",
    "experience",
    "company",
    "workPlace",
    "jobLocation",
    "jobType",
  ];

  const fieldWeights = {
    skills: 0.8,
    experience: 0.5,
    company: 0.2,
    workPlace: 0.1,
    jobLocation: 0.1,
    jobType: 0.1,
  };

  const values = {
    skills: [...jobSkills, ...userSkills],
    experience: [jobExperience, userExperience],
    company: [jobCompany, userCompany],
    workPlace: [jobWorkPlace, userWorkPlace],
    jobLocation: [jobLocation, userLocation],
    jobType: [jobType, userJobType],
  };

  // Calculate number of matched skills
  const matchedSkills = jobSkills.filter((skill) =>
    userSkills.includes(skill)
  ).length;

  // Calculate dot product
  const dotProduct = calculateDotProduct(fields, fieldWeights, values);

  // Calculate magnitudes
  const magnitude1 = Math.sqrt(
    jobSkills.length * jobExperience ** 2 +
      fieldWeights["company"] ** 2 +
      fieldWeights["workPlace"] ** 2 +
      fieldWeights["jobLocation"] ** 2 +
      fieldWeights["jobType"] ** 2
  );

  const magnitude2 = Math.sqrt(
    userSkills.length * userExperience ** 2 +
      fieldWeights["company"] ** 2 +
      fieldWeights["workPlace"] ** 2 +
      fieldWeights["jobLocation"] ** 2 +
      fieldWeights["jobType"] ** 2
  );

  // Check if magnitudes are 0
  if (magnitude1 === 0 || magnitude2 === 0 || matchedSkills === 0) {
    return {
      similarity: 0,
      matchedSkills,
      status: "rejected",
      reason: "Insufficient skills or empty skill set",
    };
  }

  // Calculate cosine similarity
  let similarity = dotProduct / (magnitude1 * magnitude2);
  similarity = Math.min(similarity, 1);

  similarity = isNaN(similarity) ? 0 : similarity;

  if (similarity <= 0.07) {
    return {
      similarity,
      matchedSkills,
      status: "rejected",
      reason: "Low similarity score",
    };
  } else if (userSkills.length >= jobSkills.length) {
    return {
      similarity,
      matchedSkills,
      status: "matched",
      reason: "High similarity score and user has additional skills",
    };
  } else {
    return {
      similarity,
      matchedSkills,
      status: "shortlisted",
      reason: "High similarity score",
    };
  }
}

function calculateDotProduct(fields, fieldWeights, values) {
  let dotProduct = 0;
  for (let i = 0; i < fields.length; i++) {
    const field = fields[i];
    const fieldWeight = fieldWeights[field];
    const fieldValues = values[field];

    if (field === "skills") {
      const matchedSkills = fieldValues.filter((skill) =>
        values["skills"].includes(skill)
      );
      dotProduct += fieldWeight * matchedSkills.length;
    } else {
      const jobValue = fieldValues[0].toString();
      const userValue = fieldValues[1].toString();
      const fieldValueMatch = jobValue === userValue ? 1 : 0;
      dotProduct += fieldWeight * fieldValueMatch;

      // Additional check for matching user experience with job type, location, workplace, and company
      if (
        field === "experience" ||
        field === "jobType" ||
        field === "jobLocation" ||
        field === "workPlace" ||
        field === "company"
      ) {
        const jobFieldValue = fieldValues[0].toString().toLowerCase();
        const userFieldValue = fieldValues[1].toString().toLowerCase();
        const fieldValueMatch = jobFieldValue === userFieldValue ? 1 : 0;
        dotProduct += fieldWeight * fieldValueMatch;
      }
    }
  }
  return dotProduct;
}

// // Example usage:
// const job3 = {
//   skills: ["python", "django"],
//   experience: 4.5,
//   company: "DEF Solutions",
//   workPlace: "Remote",
//   jobLocation: "Berlin",
//   jobType: "Freelance",
// };

// const user3 = {
//   skills: ["python", "django", "postgresql"],
//   experience: 4,
//   company: "GHI Corporation",
//   workPlace: "Hybrid",
//   jobLocation: "Berlin",
//   jobType: "Full-time",
// };

// const result3 = cosineSimilarity(job3, user3);
// console.log(result3);

// const job2 = {
//   skills: ["javascript", "react", "node"],
//   experience: 3,
//   company: "DEF Solutions",
//   workPlace: "Remote",
//   jobLocation: "Berlin",
//   jobType: "Freelance",
// };

// const user2 = {
//   skills: ["python", "django"],
//   experience: 4,
//   company: "GHI Corporation",
//   workPlace: "Office",
//   jobLocation: "Berlin",
//   jobType: "Full-time",
// };

// const result2 = cosineSimilarity(job2, user2);
// console.log(result2);

// const job5 = {
//   skills: ["python", "django"],
//   experience: 3,
//   company: "XYZ Corporation",
//   workPlace: "Office",
//   jobLocation: "London",
//   jobType: "Full-time",
// };

// const user5 = {
//   skills: ["python"],
//   experience: 0,
//   company: "ABC Solutions",
//   workPlace: "Office",
//   jobLocation: "London",
//   jobType: "Full-time",
// };

// const result5 = cosineSimilarity(job5, user5);
// console.log(result5);

module.exports ={
  cosineSimilarity
}