import React, { useState, useEffect } from "react";
import {
  DeleteJobButton,
  EditJobButton,
  ManageJobListHeading,
  ManageJobListItemWrapper,
  ManageJobWrapper,
} from "./Styles/ManageJobStyled";
import { API } from "../../env";
import { Link } from "react-router-dom";

const ManageJobSection = () => {
  // const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jobData, setJobData] = useState([]);

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await fetch(`${API}/api/job/${jobId}?token=${localStorage.getItem("token")}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      setSuccessMessage("Job deleted successfully");
    } catch (error) {
      setErrorMessage("Failed to delete job", error);
      console.error("Failed to delete job:", error);
    }
  };

  const handleViewApplicants = async (jobId) => {
    try {
      const response = await fetch(`${API}/api/job/${jobId}/applicants?token=${localStorage.getItem("token")}`);

      if (!response.ok) {
        throw new Error("Failed to fetch applicants");
      }

      const data = await response.json();

      console.log("Applicants:", data);
    } catch (error) {
      console.error("Failed to fetch applicants:", error);
    }
  };

  const handleSubmit = (event, jobId) => {
    event.preventDefault();
    const updatedJobData = {
      title: event.target.title.value,
      description: event.target.description.value,
      experience: event.target.experience.value,
      company: event.target.company.value,
      workPlace: event.target.workPlace.value,
      jobLocation: event.target.jobLocation.value,
      jobType: event.target.jobType.value,
      skills: event.target.skills.value.split(","),
    };

    handleEditJob(updatedJobData, jobId);
  };

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`${API}/api/job/my-jobs?token=${localStorage.getItem("token")}`);
        if (!response.ok) {
              if (response.status === 403) {
          // Unauthorized access
          setErrorMessage("Unauthorized access");
        }
          throw new Error("Failed to fetch job data");
        }

        const data = await response.json();
        setJobData(data); // Set the retrieved job data in the state
      } catch (error) {
        console.error("Failed to fetch job data:", error);
      }
    };

    fetchJobData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessage]);

  // Wait for jobData to be fetched before rendering the component
  if (jobData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <ManageJobWrapper>
      {jobData.jobs.map((job) => (
        <ManageJobListItemWrapper key={job._id}>
          <ManageJobListHeading>Title: {job.title}</ManageJobListHeading>
          <div>
            <div>Description: {job.description}</div>
            <div>Location: {job.jobLocation}</div>
            <div>Posted: {job.username}</div>
          </div>
          <div>
            {/* {editMode ? (
              <form onSubmit={(event) => handleSubmit(event, job._id)}>
                <input
                  type="text"
                  name="title"
                  defaultValue={job.title}
                  placeholder="Job Title"
                />
                <button type="submit">Save</button>
              </form>
            ) : (
              <>
                <EditJobButton onClick={() => setEditMode(true)}>
                  Edit Job
                </EditJobButton>
                <DeleteJobButton onClick={() => handleDeleteJob(job._id)}>
                  Delete Job
                </DeleteJobButton>
                <button onClick={() => handleViewApplicants(job._id)}>
                  View Applicants
                </button>
              </>
            )} */}
            <Link to={`edit-job/${job._id}`}>
            <EditJobButton onClick={() => setEditMode(true)}>
                  Edit Job
                </EditJobButton>
            </Link>
                <DeleteJobButton onClick={() => handleDeleteJob(job._id)}>
                  Delete Job
                </DeleteJobButton>
                <button onClick={() => handleViewApplicants(job._id)}>
                  View Applicants
                </button>
          </div>
          {successMessage && <div>{successMessage}</div>}
          {errorMessage && <div>{errorMessage}</div>}
        </ManageJobListItemWrapper>
      ))}
    </ManageJobWrapper>
  );
  
};

export default ManageJobSection;
