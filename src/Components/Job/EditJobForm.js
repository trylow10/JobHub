import React, { useEffect, useState } from "react";
import { Button, FormContainer, FormHeading, Input, Label, Textarea, Form, Select, ErrorMessage } from "./Styles/CreateJob";
import { API } from "../../env";
import { useParams, useNavigate } from "react-router-dom";

const EditJobForm = () => {
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

  const [jobPosterId, setJobPosterId] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getJobById = async () => {
      try {
        const response = await fetch(
          `${API}/api/job/${id}?token=${localStorage.getItem("token")}`
        );
        const data = await response.json();

        setTitle(data.job.title);
        setDescription(data.job.description);
        setExperience(data.job.experience.toString());
        setCompany(data.job.company);
        setWorkPlace(data.job.workPlace);
        setJobLocation(data.job.jobLocation);
        setJobType(data.job.jobType);
        setSkills(data.job.skills);
        setJobPosterId(data.job.jobPoster._id);
      } catch (error) {
        console.error(error);
      }
    };

    getJobById();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/api/job/${id}?token=${localStorage.getItem("token")}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            experience: Number(experience),
            company,
            workPlace,
            jobLocation,
            jobType,
            skills,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/manage-job");
      } else {
        // Handle the error case, if needed
        console.log(data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSkillsChange = (e) => {
    const inputSkills = e.target.value.split(",");
    setSkills(inputSkills);
  };

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setTitleError("Please enter the job title");
      isValid = false;
    } else {
      setTitleError("");
    }

    if (!description.trim()) {
      setDescriptionError("Please enter the job description");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!experience.trim()) {
      setExperienceError("Please enter the required experience");
      isValid = false;
    } else {
      setExperienceError("");
    }

    if (!company.trim()) {
      setCompanyError("Please enter the company name");
      isValid = false;
    } else {
      setCompanyError("");
    }

    if (!jobLocation.trim()) {
      setJobLocationError("Please enter the job location");
      isValid = false;
    } else {
      setJobLocationError("");
    }

    if (skills.length === 0) {
      setSkillsError("Please enter at least one skill");
      isValid = false;
    } else {
      setSkillsError("");
    }

    return isValid;
  };

  return (
    <FormContainer>
      <FormHeading>Edit Job</FormHeading>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="title">Job Title</Label>
        <Input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {titleError && <ErrorMessage>{titleError}</ErrorMessage>}

        <Label htmlFor="description">Job Description</Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {descriptionError && <ErrorMessage>{descriptionError}</ErrorMessage>}

        <Label htmlFor="experience">Experience (in years)</Label>
        <Input
          type="number"
          id="experience"
          name="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
        />
        {experienceError && <ErrorMessage>{experienceError}</ErrorMessage>}

        <Label htmlFor="company">Company</Label>
        <Input
          type="text"
          id="company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        {companyError && <ErrorMessage>{companyError}</ErrorMessage>}

        <Label htmlFor="workPlace">Work Place</Label>
        <Select
          id="workPlace"
          name="workPlace"
          value={workPlace}
          onChange={(e) => setWorkPlace(e.target.value)}
        >
          <option value="Onsite">Onsite</option>
          <option value="Remote">Remote</option>
        </Select>

        <Label htmlFor="jobLocation">Job Location</Label>
        <Input
          type="text"
          id="jobLocation"
          name="jobLocation"
          value={jobLocation}
          onChange={(e) => setJobLocation(e.target.value)}
        />
        {jobLocationError && <ErrorMessage>{jobLocationError}</ErrorMessage>}

        <Label htmlFor="jobType">Job Type</Label>
        <Select
          id="jobType"
          name="jobType"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
        >
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Contract">Contract</option>
        </Select>

        <Label htmlFor="skills">Skills</Label>
        <Textarea
          id="skills"
          name="skills"
          value={skills.join(",")}
          onChange={handleSkillsChange}
        />
        {skillsError && <ErrorMessage>{skillsError}</ErrorMessage>}

        <Input
          type="hidden"
          id="jobPosterId"
          name="jobPosterId"
          value={jobPosterId}
        />

        <Button type="submit">Update Job</Button>
      </Form>
    </FormContainer>
  );
};

export default EditJobForm;
