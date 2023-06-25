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
} from "../Job/Styles/CreateJob";
import { API } from "../../env";

const CreateJobForm = ({ userId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [company, setCompany] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [skills, setSkills] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      setWorkPlace("");
      setJobLocation("");
      setJobType("");
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
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Label>Experience</Label>
        <Input
          type="number"
          min={0}
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          required
        />
        {experience !== "0" && (
          <>
            <Label>Company</Label>
            <Input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required={experience !== "0"}
            />
            <Label>Work Type</Label>
            <Select
              type="text"
              value={workPlace}
              onChange={(e) => setWorkPlace(e.target.value)}
              required
            >
              <option value="Onsite" defaultChecked>
                Onsite
              </option>
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
          </>
        )}
        <Label>Job Type</Label>
        <Select
          type="text"
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

        <Button type="submit">Create Job</Button>
      </Form>
    </FormContainer>
  );
};

export default CreateJobForm;
