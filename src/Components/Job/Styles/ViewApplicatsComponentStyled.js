import styled from "styled-components";

export const ViewApplicantWrapper = styled.div`
  padding: 0 2rem;
  margin: 2rem 12rem 12rem 12rem;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  td {
    padding: 8px;
  }
  td img {
    width: 50px; /* Adjust the width as needed */
    height: 50px; /* Adjust the height as needed */
    object-fit: cover;
    border-radius: 50%;
  }
  tr:nth-child(even) {
    background-color: #dddddd;
  }
  tr:not(:last-child) {
    margin-bottom: 10px; /* Increase the margin-bottom as needed */
  }
`;

export const ApplicantName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const ApplicantInfo = styled.p`
  margin-bottom: 3px;
`;
