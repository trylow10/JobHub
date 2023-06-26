import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../env";
import {
  StyledJobDetailComponent,
  JobDetailContainer,
  Title,
  Description,
  Company,
  LoadingText,
  Workplace,
  Skills,
  PostedBy,
  JobLocation,
  JobType,
  ApplyJobButton,
} from "../Job/Styles/JobDetails";
import JobApplyForm from "./JobApplyForm"

const JobDetailComponent = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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

  const handleApplyClick = () => {
    setShowForm(true);
  };

  if (loading) {
    return <LoadingText>Loading...</LoadingText>;
  }

  return (
    <StyledJobDetailComponent>
      <JobDetailContainer>
        <Title>Title: {job.title}</Title>
        <Description>Description: {job.description}</Description>
        <Company>Company: {job.company}</Company>
        <Workplace>Workplace: {job.workPlace}</Workplace>
        <JobLocation>Job Location: {job.jobLocation}</JobLocation>
        <JobType>Job Type: {job.jobType}</JobType>
        <Skills>Skills: {job.skills.join(", ")}</Skills>
        <PostedBy>Posted by: {job.jobPoster.name}</PostedBy>
        {!showForm ? (
          <ApplyJobButton onClick={handleApplyClick}>Apply Now</ApplyJobButton>
        ) : (
          <JobApplyForm jobId={job._id} />
        )}
      </JobDetailContainer>
    </StyledJobDetailComponent>
  );
};

export default JobDetailComponent;
