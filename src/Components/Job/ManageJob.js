import React, { useState, useEffect } from "react";
import {
  DeleteJobButton,
  EditJobButton,
  ManageJobListHeading,
  ManageJobListItemWrapper,
  ManageJobWrapper,
  ViewApplicationBtn,
} from "./Styles/ManageJobStyled";
import { API } from "../../env";
import { Link } from "react-router-dom";

const ManageJobSection = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jobData, setJobData] = useState([]);

  const handleDeleteJob = async (jobId) => {
    try {
      const response = await fetch(
        `${API}/api/job/${jobId}?token=${localStorage.getItem("token")}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete job");
      }

      setSuccessMessage("Job deleted successfully");
    } catch (error) {
      setErrorMessage("Failed to delete job", error);
      console.error("Failed to delete job:", error);
    }
  };


  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const response = await fetch(
          `${API}/api/job/my-jobs?token=${localStorage.getItem("token")}`
        );
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

  // Wait for jobData to be fetched before rendering the component
  if (jobData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <ManageJobWrapper>
      {jobData.jobs.map((job) => (
        <ManageJobListItemWrapper key={job._id}>
          <div className="view-applicants">
            <ManageJobListHeading>Title: {job.title}</ManageJobListHeading>
            <Link to={`view/${job._id}`}>
              <ViewApplicationBtn>
                <i className="fa-solid fa-eye" />
              </ViewApplicationBtn>
            </Link>
          </div>
          <div>
            <div>Description: {job.description}</div>
            <div>Location: {job.jobLocation}</div>
            <div>Posted: {job.username}</div>
          </div>
          <div>
            <Link to={`edit-job/${job._id}`}>
              <EditJobButton>Edit Job</EditJobButton>
            </Link>
            <DeleteJobButton onClick={() => handleDeleteJob(job._id)}>
              <i className="fa-solid fa-trash" />
            </DeleteJobButton>
          </div>
          {successMessage && <div>{successMessage}</div>}
          {errorMessage && <div>{errorMessage}</div>}
        </ManageJobListItemWrapper>
      ))}
    </ManageJobWrapper>
  );
};

export default ManageJobSection;
