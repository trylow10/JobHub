import styled from 'styled-components';

export const JobDetailWrapper = styled.div`
  /* Add wrapper styles */
`;

export const Title = styled.h2`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;w
`;

export const Description = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
  white-space: pre-line;
`;

export const Company = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const Workplace = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const JobLocation = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const JobType = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const Skills = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const PostedBy = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const LoadingText = styled.div`
  font-size: 18px;
  color: #333;
`;

export const ApplyJobButton = styled.a`
  display: inline-block;
  background-color: #0a66c2;
  color: white;
  font-weight: 600;
  padding: 12px 16px;
  border-radius: 20px;
  cursor: pointer;
  text-decoration: none;
  margin-top: 20px;

  &:hover {
    background-color: #095299;
  }
`;

export const StyledJobDetailComponent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-left: 200px; /* Adjust the value based on your sidebar width */
  padding-right: 200px; /* Adjust the value based on your sidebar width */
`;

export const JobDetailContainer = styled.div`
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 8px;
  max-width: 800px; /* Adjust the value as needed */
  width: 100%;
  
  > * + * {
    margin-top: 15px;
  }
`;
