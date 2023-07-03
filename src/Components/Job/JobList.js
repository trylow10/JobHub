import React, { useEffect, useState } from "react";
import { API } from "../../env";
import {
  JobListWrapper,
  JobListItemWrapper,
  JobListHeading,
  ApplyJobButton,
  JobListInfo,
  ErrorMessage,
  DisplayMessage,
} from "./Styles/JobListStyled";
import { Link } from "react-router-dom";
import { Container, Section } from "./Styles/JobSidebarStyled";
import UserInfo from "../Feed/UserInfo";
import Loader from "../extra/Loader";

const JobList = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [followersJobs, setFollowersJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const response = await fetch(
          `${API}/api/job/recommendedJobs?token=${localStorage.getItem(
            "token"
          )}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recommended jobs");
        }
        const data = await response.json();
        setRecommendedJobs(data.jobs);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch recommended jobs");
      }
    };

    const fetchAllJobs = async () => {
      try {
        const response = await fetch(
          `${API}/api/job/allJobs?token=${localStorage.getItem("token")}`
        );
        if (!response.ok) {
          throw new Error("No response from api");
        }
        const data = await response.json();
        setAllJobs(data.jobs);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch all jobs");
      }
    };

    const fetchFollowersJobs = async () => {
      try {
        const response = await fetch(
          `${API}/api/job/followersJobs?token=${localStorage.getItem("token")}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch followers' jobs");
        }
        const data = await response.json();
        setFollowersJobs(data.jobs);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch followers' jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedJobs();
    fetchAllJobs();
    fetchFollowersJobs();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage>Error: {error}</ErrorMessage>;
  }

  return (
    <>
      <UserInfo showDisoverMore={false} />
      <Container>
        <Section className="discover">
          <span className="events">
            <p>
              <Link to={"/create-job"}>Post Job</Link>
            </p>
            <i className="fa-solid fa-plus" />
          </span>
          <span className="events">
            <p>
              <Link to={"/manage-job"}>Manage job</Link>
            </p>
            <i className="fa-solid fa-briefcase" />
          </span>
        </Section>
      </Container>
      <div>
        <JobListHeading>Explore Jobs</JobListHeading>
        <JobListWrapper>
          {allJobs.length > 0 ? (
            allJobs.map((job) => (
              <JobListItemWrapper key={job._id}>
                <JobListInfo>
                  <h3>{job.title}</h3>
                  <p>Description: {job.description}</p>
                  <p>Posted by: {job.jobPoster.uname}</p>
                </JobListInfo>
                <Link to={`/job/${job._id}`} style={{ alignSelf: "center" }}>
                  <ApplyJobButton>See More</ApplyJobButton>
                </Link>
              </JobListItemWrapper>
            ))
          ) : (
            <DisplayMessage>No jobs found.</DisplayMessage>
          )}
        </JobListWrapper>
      </div>
      <div>
        <JobListHeading>Recommended Jobs for You</JobListHeading>
        <JobListWrapper>
          {recommendedJobs.length > 0 ? (
            recommendedJobs.map((job) => (
              <JobListItemWrapper key={job._id}>
                <JobListInfo>
                  <h3>{job.title}</h3>
                  <p>Description: {job.description}</p>
                  <p>Posted by: {job.jobPoster.uname}</p>
                </JobListInfo>
                <Link to={`/job/${job._id}`} style={{ alignSelf: "center" }}>
                  <ApplyJobButton>See More</ApplyJobButton>
                </Link>
              </JobListItemWrapper>
            ))
          ) : (
            <DisplayMessage>No recommended jobs found.</DisplayMessage>
          )}
        </JobListWrapper>
      </div>
      <div>
        <JobListHeading>Jobs from Your Connection</JobListHeading>
        <JobListWrapper>
          {followersJobs.length > 0 ? (
            followersJobs.map((job) => (
              <JobListItemWrapper key={job._id}>
                <JobListInfo>
                  <h3>{job.title}</h3>
                  <p>Description: {job.description}</p>
                  <p>Posted by: {job.jobPoster.uname}</p>
                </JobListInfo>
                <Link to={`/job/${job._id}`} style={{ alignSelf: "center" }}>
                  <ApplyJobButton>See More</ApplyJobButton>
                </Link>
              </JobListItemWrapper>
            ))
          ) : (
            <DisplayMessage>No jobs from your connection.</DisplayMessage>
          )}
        </JobListWrapper>
      </div>
    </>
  );
};

export default JobList;
