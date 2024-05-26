import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../post/Post";
import "./posts.scss";
import { useAuth } from "../../context/Auth";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [auth] = useAuth();
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/post`);
        const filteredPosts = response.data.post.filter(
          (post) => post.createdBy._id !== auth.user.userId
        );
        filteredPosts.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [baseUrl, auth]);

  return (
    <div className="posts">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
