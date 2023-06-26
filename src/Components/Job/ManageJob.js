import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  DeleteJobButton,
  EditJobButton,
  ManageJobListHeading,
  ManageJobListItemWrapper,
  ManageJobWrapper,
} from "./Styles/ManageJobStyled";
import { API } from "../../env";

const ManageJobSection = () => {
  const [editMode, setEditMode] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jobData, setJobData] = useState(null);
  const [userJobs, setUserJobs] = useState([]);
  const { id } = useParams();

  const handleEditJob = async (updatedJobData) => {
    try {
      const response = await fetch(`${API}/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedJobData),
      });

      if (!response.ok) {
        throw new Error("Failed to update job");
      }

      setSuccessMessage("Job updated successfully");
      setEditMode(false);
    } catch (error) {
      setErrorMessage("Failed to update job");
      console.error("Failed to update job:", error);
    }
  };

  const handleDeleteJob = async () => {
    try {
      const response = await fetch(`${API}/api/jobs/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      setSuccessMessage("Job deleted successfully");
    } catch (error) {
      setErrorMessage("Failed to delete job");
      console.error("Failed to delete job:", error);
    }
  };

  const handleViewApplicants = async () => {
    try {
      const response = await fetch(`${API}/api/jobs`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const data = await response.json();

      console.log("Jobs:", data);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  const handleSubmit = (event) => {
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

    handleEditJob(updatedJobData);
  };

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(`${API}/api/jobs/${id}`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch job data");
        }

        const data = await response.json();
        setJobData(data); // Set the retrieved job data in the state
      } catch (error) {
        console.error("Failed to fetch job data:", error);
      }
    };

    fetchJobData();
  }, [id]);

  useEffect(() => {
    const fetchUserJobs = async () => {
      try {
        const response = await fetch(`${API}/api/my-jobs`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user jobs");
        }

        const data = await response.json();
        setUserJobs(data);
      } catch (error) {
        console.error("Failed to fetch user jobs:", error);
      }
    };

    fetchUserJobs();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessage]);

  return (
    <ManageJobWrapper>
      <ManageJobListItemWrapper>
        <ManageJobListHeading>{jobData?.title || "Job Title"}</ManageJobListHeading>
        <div>
          <div>Description: {jobData?.description || "Lorem ipsum dolor sit amet."}</div>
          <div>Location: {jobData?.location || "New York, NY"}</div>
          <div>Posted: {jobData?.postedDate || "June 25, 2023"}</div>
        </div>
        <div>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <input type="text" name="title" defaultValue={jobData?.title} placeholder="Job Title" />
              {/* Add other input fields */}
              <button type="submit">Save</button>
            </form>
          ) : (
            <>
              <EditJobButton onClick={() => setEditMode(true)}>
                Edit Job
              </EditJobButton>
              <DeleteJobButton onClick={handleDeleteJob}>
                Delete Job
              </DeleteJobButton>
              <button onClick={handleViewApplicants}>View Applicants</button>
            </>
          )}
        </div>
        {successMessage && <div>{successMessage}</div>}
        {errorMessage && <div>{errorMessage}</div>}
      </ManageJobListItemWrapper>
    </ManageJobWrapper>
  );
};

export default ManageJobSection;
