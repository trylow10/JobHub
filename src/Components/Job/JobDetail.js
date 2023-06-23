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
    <JobDetailWrapper>
      <Title>{job.title}</Title>
      <Description>Description: {job.description}</Description>
      <Company>Company: {job.company}</Company>
      <Workplace>Workplace: {job.workPlace}</Workplace>
      <JobLocation>Job Location: {job.jobLocation}</JobLocation>
      <JobType>Job Type: {job.jobType}</JobType>
      <Skills>Skills: {job.skills.join(", ")}</Skills>
      <PostedBy>Posted by: {job.jobPoster.name}</PostedBy>
      <ApplyJobButton >Apply Now</ApplyJobButton>
    </JobDetailWrapper>
  );
};

export default JobDetailComponent;
