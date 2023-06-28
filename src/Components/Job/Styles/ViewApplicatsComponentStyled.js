import styled from "styled-components";

export const ViewApplicantWrapper = styled.div`
  padding: 0 2rem;
  margin: 2rem 12rem 12rem 12rem;
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }
  td,
  th {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
  }
  tr:nth-child(even) {
    background-color: #dddddd;
  }
`;

export const ApplicantImage = styled.div`
  height: 70px;
  width: 70px;
  object-fit: cover;
  background: black;
  border: 1px solid;
`;
export const ApplicantName = styled.h3`
  font-size: 18px;
  margin-bottom: 5px;
`;

export const ApplicantInfo = styled.p`
  margin-bottom: 3px;
`;
