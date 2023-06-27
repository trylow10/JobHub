import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../env";

const ViewApplicantsComponent = () => {
  const { id } = useParams();

  const handleViewApplicants = async () => {
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

      console.log("Applicants:", data);
    } catch (error) {
      console.error("Failed to fetch applicants:", error);
    }
  };

  useEffect(() => {
    handleViewApplicants();
  }, [id]);

  return (
    <div>
      <span>TEST</span>
    </div>
  );
};

export default ViewApplicantsComponent;
