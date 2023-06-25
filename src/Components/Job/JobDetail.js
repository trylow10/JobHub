import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../env";
import {
  JobDetailWrapper,
  Title,
  Description,
  Company,
  LoadingText,
  Workplace,
  Skills,
  PostedBy,
  JobLocation,
  JobType,
  ApplyJobButton
} from "../Job/Styles/JobDetails";
import { Link } from "react-router-dom"; 
const JobDetailComponent = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const response = await fetch(
          `${API}/api/job/${id}?token=${localStorage.getItem("token")}`
        );
        const data = await response.json();
        setJob(data.job);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobDetail();
  }, [id]);

  if (loading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  return (
    <div className="flex">
    <JobDetailWrapper>
      <Title>{job.title}</Title>
      <Description>Description: {job.description}</Description>
      <Company>Company: {job.company}</Company>
      <Workplace>Workplace: {job.workPlace}</Workplace>
      <JobLocation>Job Location: {job.jobLocation}</JobLocation>
      <JobType>Job Type: {job.jobType}</JobType>
      <Skills>Skills: {job.skills.join(", ")}</Skills>
      <PostedBy>Posted by: {job.jobPoster.name}</PostedBy>
      <Link to={`/application/${job._id}/apply`}>
      <ApplyJobButton>Apply Now</ApplyJobButton>
      </Link>
    </JobDetailWrapper>
    </div>
  );
};

export default JobDetailComponent;
