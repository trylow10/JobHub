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
import { Container, Section } from "./Styles/JobSidebarStyled";
import UserInfo from "../Feed/UserInfo";

const JobList = () => {
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [followersJobs, setFollowersJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendedJobs = async () => {
      try {
        const response = await fetch(
          `${API}/api/job/recommendedJobs?token=${localStorage.getItem(
            "token"
          )}`
        );
        const data = await response.json();
        setRecommendedJobs(data.jobs);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAllJobs = async () => {
      try {
        const response = await fetch(
          `${API}/api/job/allJobs?token=${localStorage.getItem("token")}`
        );
        const data = await response.json();
        setAllJobs(data.jobs);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFollowersJobs = async () => {
      try {
        const response = await fetch(
          `${API}/api/job/followersJobs?token=${localStorage.getItem("token")}`
        );
        const data = await response.json();
        setFollowersJobs(data.jobs);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecommendedJobs();
    fetchAllJobs();
    fetchFollowersJobs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
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
        <JobListHeading>Recommended Jobs for You</JobListHeading>
        <JobListWrapper>
          {recommendedJobs.length > 0 ? (
            recommendedJobs.map((job) => (
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
            ))
          ) : (
            <div>No recommended jobs found.</div>
          )}
        </JobListWrapper>
      </div>
      <div>
        <JobListHeading>All Jobs</JobListHeading>
        <JobListWrapper>
          {allJobs.length > 0 ? (
            allJobs.map((job) => (
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
            ))
          ) : (
            <div>No jobs found.</div>
          )}
        </JobListWrapper>
      </div>
      <div>
        <JobListHeading>Jobs from Your Followers</JobListHeading>
        <JobListWrapper>
          {followersJobs.length > 0 ? (
            followersJobs.map((job) => (
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
            ))
          ) : (
            <div>No jobs from your followers found.</div>
          )}
        </JobListWrapper>
      </div>
    </div>
  );
};

export default JobList;
