import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API, PROFILE_IMG } from "../../env";
import { ViewApplicantWrapper } from "./Styles/ViewApplicatsComponentStyled";

const ViewApplicantsComponent = () => {
  const { id } = useParams();
  const [applicants, setApplicants] = useState([]);
  const [cosineSimilarity, setCosineSimilarity] = useState({});

  const fetchApplicants = async () => {
    try {
      const response = await fetch(
        `${API}/api/application/${id}/applicants?token=${localStorage.getItem(
          "token"
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applicants");
      }

      const data = await response.json();
      setApplicants(data.applicants);
    } catch (error) {
      console.error("Failed to fetch applicants:", error);
    }
  };

  const fetchCosineSimilarity = async () => {
    try {
      const response = await fetch(
        `${API}/api/application/${id}/cosine?token=${localStorage.getItem(
          "token"
        )}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cosine similarity");
      }
      const data = await response.json();
      const cosineSimilarities = data.applicants.map(
        (user) => user.cosineSimilarity
      );
      console.log(cosineSimilarities);
      setCosineSimilarity(cosineSimilarities);
    } catch (error) {
      console.error("Failed to fetch cosine similarity:", error);
    }
  };

  useEffect(() => {
    fetchApplicants();
    fetchCosineSimilarity();
  }, [id]);

  return (
    <div>
      <ViewApplicantWrapper>
        <table>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Email</th>
            <th>Previous Company</th>
            <th>Experience In Years</th>
            <th>User Skills</th>
            <th>Status</th>
            <th>Reason</th>
          </tr>
          {applicants?.map((applicant, index) => (
            <tr key={applicant._id}>
              <td>
                {" "}
                {applicant.profileImg && (
                  <img
                    src={applicant.profileImg ?? PROFILE_IMG}
                    alt="Profile"
                  />
                )}
              </td>
              <td>{applicant.uname}</td>
              <td>{applicant.email}</td>
              <td>{applicant.company}</td>
              <td>{applicant.experience}</td>
              <td>{applicant.skills.join(", ")}</td>
              <td>{cosineSimilarity[index]?.status}</td>
              <td>{cosineSimilarity[index]?.reason}</td>
            </tr>
          ))}
        </table>
      </ViewApplicantWrapper>
    </div>
  );
};

export default ViewApplicantsComponent;
