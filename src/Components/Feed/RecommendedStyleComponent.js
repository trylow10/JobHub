import React, { useEffect, useState } from "react";
import { API } from "../../env";
import {
  FeedContainer,
  PostContainer,
  PostTitle,
  PostContent,
} from "../Feed/Styles/RecomendedStyles";

const RecomendPostComponent = () => {
  const [feedPosts, setFeedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedPosts();
  }, []);

  const fetchFeedPosts = async () => {
    try {
      // Fetch feed posts from the API endpoint
      const response = await fetch(
        `${API}/api/post/recommended?token=${localStorage.getItem("token")}`
      );
      const data = await response.json();
      if (data.success) {
        setFeedPosts(data.recommendedProfiles);
      } else {
        console.error("Error fetching feed posts:", data.error.msg);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching feed posts:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  console.log("----", feedPosts);
  return (
    <FeedContainer>
      <h2>Feed</h2>
      {feedPosts.length > 0 ? (
        feedPosts.map((post) => (
          <PostContainer key={post._id}>
            <PostTitle>{post._id}</PostTitle>
            <div>
              <h4>Post:</h4>
              <PostContent>
                <p>Post Text: {post.postText}</p>
                <p>Hashtags: {post.hashtags.join(", ")}</p>
              </PostContent>
            </div>
            <div>
              <h4>User:</h4>
              <PostContent>
                <p>Profile Picture: {post.profilePicture}</p>
              </PostContent>
            </div>
          </PostContainer>
        ))
      ) : (
        <p>No posts available.</p>
      )}
    </FeedContainer>
  );
};

export default RecomendPostComponent;
