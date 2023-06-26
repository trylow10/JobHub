import React, { useState } from "react";
import {
  Button,
  FormContainer,
  FormHeading,
  Input,
  Label,
  Textarea,
  Form,
  Select,
  ErrorMessage,
} from "../Job/Styles/CreateJob";
import { API } from "../../env";

const CreateJobForm = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [experience, setExperience] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [company, setCompany] = useState("");
  const [companyError, setCompanyError] = useState("");
  const [workPlace, setWorkPlace] = useState("Onsite");
  const [jobLocation, setJobLocation] = useState("");
  const [jobLocationError, setJobLocationError] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [skills, setSkills] = useState([]);
  const [skillsError, setSkillsError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform client-side form validation
    if (!validateForm()) {
      return;
    }

    // Perform API request to create a job
    try {
      const response = await fetch(
        `${API}/api/job/create?token=${localStorage.getItem("token")}`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            experience,
            company,
            workPlace,
            jobLocation,
            jobType,
            skills,
            jobPoster: userId,
          }),
        }
      );

      const data = await response.json();
      console.log(data); // Handle the API response accordingly

      // Reset form fields
      setTitle("");
      setDescription("");
      setExperience("");
      setCompany("");
      setWorkPlace("Onsite");
      setJobLocation("");
      setJobType("Full-time");
      setSkills([]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSkillsChange = (e) => {
    const inputSkills = e.target.value;
    const selectedSkills = inputSkills.split(",").map((skill) => skill.trim());
    setSkills(selectedSkills);
  };

  const validateForm = () => {
    let isValid = true;

    // Validate title field
    if (title.trim() === "") {
      setTitleError("Title is required");
      isValid = false;
    } else {
      setTitleError("");
    }

    // Validate description field
    if (description.trim() === "") {
      setDescriptionError("Description is required");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    // Validate experience field
    if (
      experience.trim() === "" ||
      isNaN(Number(experience)) ||
      Number(experience) < 0
    ) {
      setExperienceError("Experience must be a non-negative number");
      isValid = false;
    } else {
      setExperienceError("");
    }

    // Validate company field
    if (experience !== "0" && company.trim() === "") {
      setCompanyError("Company is required");
      isValid = false;
    } else {
      setCompanyError("");
    }

    // Validate job location field
    if (jobLocation.trim() === "") {
      setJobLocationError("Job location is required");
      isValid = false;
    } else {
      setJobLocationError("");
    }

    // Validate skills field
    if (skills.length === 0) {
      setSkillsError("At least one skill is required");
      isValid = false;
    } else {
      setSkillsError("");
    }

    return isValid;
  };

  return (
    <FormContainer>
      <FormHeading>Create Job</FormHeading>
      <Form onSubmit={handleSubmit}>
        <Label>Title</Label>
        <Input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        {titleError && <ErrorMessage>{titleError}</ErrorMessage>}

        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        {descriptionError && <ErrorMessage>{descriptionError}</ErrorMessage>}

        <Label>Experience</Label>
        <Input
          type="number"
          min={0}
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        {experienceError && <ErrorMessage>{experienceError}</ErrorMessage>}

        <Label>Company</Label>
        <Input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required={experience !== "0"}
        />
        {companyError && <ErrorMessage>{companyError}</ErrorMessage>}

        <Label>Work Type</Label>
        <Select
          value={workPlace}
          onChange={(e) => setWorkPlace(e.target.value)}
          required
        >
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
          <option value="Hybrid">Hybrid</option>
        </Select>

        <Label>Job Location</Label>
        <Input
          type="text"
          value={jobLocation}
          onChange={(e) => setJobLocation(e.target.value)}
          required
        />
        {jobLocationError && <ErrorMessage>{jobLocationError}</ErrorMessage>}

        <Label>Job Type</Label>
        <Select
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          required
        >
          <option value="Full-time">Full Time</option>
          <option value="Part-time">Part Time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </Select>

        <Label>Skills</Label>
        <Input
          type="text"
          value={skills.join(", ")}
          onChange={handleSkillsChange}
          required
        />
        {skillsError && <ErrorMessage>{skillsError}</ErrorMessage>}

        <Button type="submit">Create Job</Button>
      </Form>
    </FormContainer>
  );
};

export default CreateJobForm;
