import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FormContainer,
  FormGroup,
  Label,
  Input,
  Button,
 // Add SuccessMessage component import
} from "./Styles/ApplyForm";
import { API } from "../../env";

const JobApplyForm = () => {
  const [experience, setExperience] = useState("");
    const [experienceError, setExperienceError] = useState("");

  const [company, setCompany] = useState("");
  const [companyError, setCompanyError] = useState("");

  const [workPlace, setWorkPlace] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [skills, setSkills] = useState([]);
  const [skillsError, setSkillsError] = useState("");


  const { id } = useParams();

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

        const data = await response.json();
        const { experience, company, workPlace, jobLocation } = data.user;

        setExperience(experience);
        setCompany(company || "");
        setWorkPlace(workPlace || "");
        setJobLocation(jobLocation || "");
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

    // if (experience === "0") {
    //   setWorkPlace("");
    //   setJobLocation("");
    //   setCompany("");
    // }

    try {
      const response = await fetch(
        `${API}/api/job/${id}/apply?token=${localStorage.getItem("token")}`,
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
          }),
        }
      );

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log(data);

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
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Experience:</Label>
          <Input
            type="number"
            min={0}
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            placeholder="Enter your experience"
          />
        </FormGroup>
        <FormGroup>
          <Label>Company:</Label>
          <Input
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Enter your company"
          />
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
        </FormGroup>
        <Button type="submit">Apply</Button>
      </form>
    </FormContainer>
  );
};

export default JobApplyForm;
