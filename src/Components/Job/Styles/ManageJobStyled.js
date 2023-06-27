import styled from "styled-components";

export const ManageJobWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0 2rem;
  margin: 2rem 12rem 2rem 12rem;
`;

export const ManageJobListItemWrapper = styled.div`
  width: 280px;
  min-height: 300px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  border: 1px solid gray;
  border-radius: 20px;
  .view-applicants{
    display:flex;
    justify-content:space-between;
  }
`;

export const ManageJobListHeading = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
`;

export const EditJobButton = styled.button`
  background-color: #0a66c2;
  color: white;
  font-weight: 600;
  align-self: center;
  padding: 12px 16px;
  border-radius: 20px;
  cursor: pointer;
`;

export const DeleteJobButton = styled.button`
  color: red;
  font-weight: 600;
  font-size:18px;
  margin-left:108px;
  padding: 12px 16px;
  border-radius: 20px;
  cursor: pointer;
`;

export const ViewApplicantsButton = styled.button`
  background-color: #0a66c2;
  color: white;
  font-weight: 600;
  align-self: center;
  padding: 12px 16px;
  border-radius: 20px;
  cursor: pointer;
`;

export const JobListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const ViewApplicationBtn = styled.button`
cursor:pointer;
color:#0a66c2;
font-size:18px;


`;

