import styled from "styled-components";

export const FeedContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PostContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const PostTitle = styled.h3`
  font-size: 18px;
  color: #333;
  margin-bottom: 10px;
`;

export const PostContent = styled.p`
  color: #555;
  margin-bottom: 10px;
`;

export const UserProfilePicture = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: center;

  img {
    margin-right: 12px;
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 50%;
  }
`;
