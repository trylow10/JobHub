import styled from "styled-components";

export const JobListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  padding: 0 2rem;
  margin: 2rem  6rem 2rem 28rem;
`;

export const JobListItemWrapper = styled.div`
  width: 280px;
  min-height: 300px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 18px;
  border: 1px solid gray;
  border-radius: 20px;
`;

export const JobListHeading = styled.div`
  margin-left:50%;
  font-size: 24px;
  font-weight: 600;
`;

export const ApplyJobButton = styled.button`
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
