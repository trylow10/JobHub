import React, { useEffect, useState } from "react";
import Loader from "../extra/Loader";
import { PROFILE_IMG, HEADLINE, API } from "../../env";
import {
  FeedContainer,
  PostContainer,
  PostTitle,
  PostContent,
  UserProfilePicture,
} from "./Styles/RecomendedStyles";
("../../env");

const RecomendComponent = () => {
  const [recommendedHashtags, setRecommendedHashtags] = useState([]);
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendedFeed();
  }, []);

  const fetchRecommendedFeed = async () => {
    try {
      const response = await fetch(
        `${API}/api/post/recommend?token=${localStorage.getItem("token")}`
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        const hashtags = data.recommendation.hashtags.map((hashtag) => hashtag);
        setRecommendedHashtags(hashtags);

        const users = data.recommendation.recommendUsers.map((user) => ({
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture,
          headlines: user.headlines,
          hashtags: user.hashtags.filter((tag) => tag !== null),
        }));
        setRecommendedUsers(users);
      } else {
        console.error("Error fetching recommended feed:", data.error.msg);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching recommended feed:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  // ...

  return (
    <FeedContainer>
      <h2>Recommended Hashtags: {recommendedHashtags.join(", ")}</h2>
      <h2>Recommended Users</h2>
      {recommendedUsers.length > 0 ? (
        recommendedUsers.map((user, index) => (
          <PostContainer key={index}>
            <UserProfilePicture
              src={user.profilePicture || PROFILE_IMG}
              alt="Profile Picture"
            />
            <div>
              <PostTitle>{user.username}</PostTitle>
              <PostContent>
                <p>
                  Hashtags:{" "}
                  {user.hashtags.length > 0
                    ? user.hashtags.join(", ")
                    : "No hashtags"}
                </p>
              </PostContent>
            </div>
            <div>
              <PostContent>
                <p>Email: {user.email}</p>
                <p>Headlines: {user.headlines || HEADLINE}</p>
              </PostContent>
            </div>
          </PostContainer>
        ))
      ) : (
        <p>No recommended users available.</p>
      )}
    </FeedContainer>
  );
};

export default RecomendComponent;
