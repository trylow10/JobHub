import React, { useEffect, useState } from "react";
import { API } from "../../env";
import {
  JobListWrapper,
  JobListItemWrapper,
  JobListHeading,
  ApplyJobButton,
  JobListInfo,
} from "./Styles/JobListStyled";
import { Link } from "react-router-dom";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `${API}/api/job/allJobs?token=${localStorage.getItem("token")}`
        );
        const data = await response.json();
        setJobs(data.jobs);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (jobs.length === 0) {
    return <div>No jobs found.</div>;
  }

  return (
    <div>
      <JobListHeading>Job List</JobListHeading>
      <JobListWrapper>
        {jobs.map((job) => (
          <JobListItemWrapper key={job._id}>
            <JobListInfo>
              <h3>{job.title}</h3>
              <p>Description: {job.description}</p>
              <p>Posted by: {job.jobPoster.name}</p>
            </JobListInfo>
            <Link to={`/job/${job._id}`} style={{ alignSelf: "center" }}>
              <ApplyJobButton>See More</ApplyJobButton>
            </Link>
          </JobListItemWrapper>
        ))}
      </JobListWrapper>
    </div>
  );
};

export default JobList;
