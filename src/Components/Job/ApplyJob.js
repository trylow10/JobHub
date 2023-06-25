import React, { useState, useEffect, useParams } from "react";
import {
  Button,
  FormContainer,
  FormGroup,
  Input,
  Label
} from "../Job/Styles/ApplyForm";
import { API } from "../../env";

const ApplyForm = () => {
  const [experience, setExperience] = useState("");
  const [company, setCompany] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const { id } = useParams();

  useEffect(() => {
    // Fetch user's existing values from the database and set them as initial values
    const fetchUserValues = async () => {
      try {
        const response = await fetch(`${API}/api/user/basic`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }

        const data = await response.json();
        const { experience, company, workPlace, jobLocation } = data.user;

        setExperience(experience || "");
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Experience:</Label>
          <Input
            type="text"
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
          <Label>Work Place:</Label>
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

export default ApplyForm;
