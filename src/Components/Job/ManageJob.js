import React, { useState, useEffect } from "react";
import {
  DeleteJobButton,
  EditJobButton,
  ErrorMessage,
  ManageJobListHeading,
  ManageJobListItemWrapper,
  ManageJobWrapper,
  ViewApplicationBtn,
} from "./Styles/ManageJobStyled";
import { API } from "../../env";
import { Link } from "react-router-dom";

import Loader from "../extra/Loader"; // Replace "Loader" with your own Loader component

const ManageJobSection = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [jobData, setJobData] = useState([]);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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

        // Check if the user has posted any jobs
        if (data.jobs.length > 0) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Failed to fetch job data:", error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching data
      }
    };

    fetchJobData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (errorMessage) {
    return (
      <ErrorMessage>
        <h2>Unauthorized Access</h2>
      </ErrorMessage>
    );
  }

  return (
    <ManageJobWrapper>
      {jobData.jobs.length === 0 ? (
        <div className="error-container">
          <h2>No Jobs Posted</h2>
        </div>
      ) : (
        jobData.jobs.map((job) => (
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
              {isAuthorized ? (
                <>
                  <Link to={`edit-job/${job._id}`}>
                    <EditJobButton>Edit Job</EditJobButton>
                  </Link>
                  <DeleteJobButton onClick={() => handleDeleteJob(job._id)}>
                    <i className="fa-solid fa-trash" />
                  </DeleteJobButton>
                </>
              ) : (
                <ErrorMessage className="error-container">
                  <h2>Unauthorized Access</h2>
                  <p>You are not authorized to manage this job.</p>
                </ErrorMessage>
              )}
            </div>
            {successMessage && <div>{successMessage}</div>}
            {errorMessage && <div>{errorMessage}</div>}
          </ManageJobListItemWrapper>
        ))
      )}
    </ManageJobWrapper>
  );
};

export default ManageJobSection;
