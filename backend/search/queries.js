const User = require("../schema/users");
const Job = require("../schema/job");

// Function to retrieve all users from the database
async function getUsersFromDatabase() {
  try {
    const users = await User.find().lean();
    return users;
  } catch (error) {
    console.error("An error occurred while retrieving users from the database:", error);
    throw error;
  }
}

// Function to retrieve all jobs from the database
async function getJobsFromDatabase() {
  try {
    const jobs = await Job.find().lean();
    return jobs;
  } catch (error) {
    console.error("An error occurred while retrieving jobs from the database:", error);
    throw error;
  }
}

module.exports = {
  getUsersFromDatabase,
  getJobsFromDatabase,
};
