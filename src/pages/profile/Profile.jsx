import "./profile.scss";
import React, { useEffect, useState } from "react";
import Post from "../../components/post/Post";
import Share from "../../components/share/Share"
import { useAuth } from "../../context/Auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [auth] = useAuth();
  const [posts, setPosts] = useState([]);
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${baseUrl}/post`);
        const filteredPosts = response.data.post.filter(
          (post) => post.createdBy._id === auth.user.userId
        );
        filteredPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPosts(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [baseUrl, auth]);

  const handleDelete = async (postId) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      await axios.delete(`${baseUrl}/post/${postId}`, config);
      setPosts(posts.filter((post) => post._id !== postId));
      toast.success("Post deleted successfully")
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="profile">
      <div className="profileContainer">
      <Share/>
        <div className="posts">
          {posts.map((post) => (
            <Post key={post._id} post={post} onDelete={handleDelete}/>
          ))}
      </div>
      </div>
    </div>
  );
};

export default Profile;
