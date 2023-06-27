import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Button,
  SuccessMessage,
} from "./Styles/ApplyForm";
import { API } from "../../env";

const JobApplyForm = () => {
  const [experience, setExperience] = useState("");
  const [experienceError, setExperienceError] = useState("");

  const [company, setCompany] = useState("");
  const [companyError, setCompanyError] = useState("");

  const [workPlace, setWorkPlace] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobLocationError, setJobLocationError] = useState("");

  const [skills, setSkills] = useState([]);
  const [skillsError, setSkillsError] = useState("");

  const { id } = useParams();

  // Add success message state
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchUserValues = async () => {
      try {
        const response = await fetch(
          `${API}/api/user/basic?token=${localStorage.getItem("token")}`
        );

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const userData = await response.json();
        const { skills } = userData.user;
        setSkills(skills ?? []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserValues();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform client-side form validation
    if (!validateForm()) {
      return;
    }

    try {
      const response = await fetch(
        `${API}/api/application/${id}/apply?token=${localStorage.getItem(
          "token"
        )}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experience,
            company,
            workPlace,
            jobLocation,
            skills,
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);

      // Display success message
      setSuccessMessage("Job applied successfully!");

      setExperience("");
      setCompany("");
      setWorkPlace("");
      setJobLocation("");
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
    if (company.trim() === "") {
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
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Experience:</Label>
          <Input
            type="number"
            min={0}
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Enter Your experience"
          />
          <span>{experienceError}</span>
        </FormGroup>

        <FormGroup>
          <Label>Company:</Label>
          <Input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter your company"
          />
          <span>{companyError}</span>
        </FormGroup>
        <FormGroup>
          <Label>Work Type:</Label>
          <Input
            type="text"
            value={workPlace}
            onChange={(e) => setWorkPlace(e.target.value)}
            placeholder="Enter your work place"
          />
        </FormGroup>
        <FormGroup>
          <Label>Job Location:</Label>
          <Input
            type="text"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            placeholder="Enter your job location"
          />
          <span>{jobLocationError}</span>
        </FormGroup>
        <FormGroup>
          <Label>Skills:</Label>
          <Input
            type="text"
            value={skills.join(", ")}
            onChange={handleSkillsChange}
            placeholder="Enter your skills separated by commas"
          />
          <span>{skillsError}</span>
        </FormGroup>
        <Button type="submit">Apply</Button>
      </form>
      {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
    </FormContainer>
  );
};

export default JobApplyForm;
