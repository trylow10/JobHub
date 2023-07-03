import styled from "styled-components";

export const FeedContainer = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  margin: 0 124px;
`;
export const RecommendWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
`;

export const PostContainer = styled.div`
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 20px;
  align-items: center;
  width: 300px;
  min-height: 300px;
`;

export const PostTitle = styled.h3`
  font-size: 18px;
  color: black;
  margin-bottom: 10px;
  text-align: center;
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
