import "./post.scss";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "../../context/Auth";
import user from "../images/user.jpg";
import toast from "react-hot-toast";
import axios from "axios";

const Post = ({ post, onDelete }) => {
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;
  const [auth] = useAuth();
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes.length);
  const [editing, setEditing] = useState(false);
  const [newDescription, setNewDescription] = useState(post.description);
  const location = useLocation();

  useEffect(() => {
    const userLiked = post.likes.some(like => like._id === auth?.user?.userId);
    setLiked(userLiked);
    setLikes(post.likes.length);
  }, [post.likes, auth?.user?.userId]);

  const toggleLike = async () => {
    const newLikedState = !liked; 
    try {
      setLiked(newLikedState);
      setLikes(prevLikes => newLikedState ? prevLikes + 1 : prevLikes - 1);

      await axios.put(
        `${baseUrl}/post/${post._id}/${newLikedState ? "like" : "unlike"}`
      );
    } catch (error) {
      setLiked(prevLiked => !prevLiked);
      setLikes(prevLikes => newLikedState ? prevLikes - 1 : prevLikes + 1);
      console.error("Error liking the post:", error);
    }
  };  

  const handleEdit = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      };
      const updatedPost = { ...post, description: newDescription };
      await axios.put(`${baseUrl}/post/${post._id}`, updatedPost, config);
      setEditing(false);
      toast.success("Post updated successfully");
      post.description = newDescription;
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Failed to update post");
    }
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  return (
    <div className="post-wrapper">
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img
              src = {user}
              alt = "user"
            />
            <div className="details">
              <span className="name">{post.createdBy.username}</span>
              <span className="date">
                {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
        <div className="content">
          {editing ? (
            <input
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            />
          ) : (
            <p>{post.description}</p>
          )}
          <img src={`${baseUrl}/${post.image}`} alt="Post content" />
        </div>
        <div className="info">
        <div className="item" onClick={toggleLike}>
          {liked ? <FavoriteOutlinedIcon /> : <FavoriteBorderOutlinedIcon />}
          {likes} Likes
        </div>
        {location.pathname !== "/" && (
          <>
            {editing ? (
            <>
              <div className="item" onClick={handleEdit}>
                <SaveIcon />
                Save
              </div>
              <div className="item" onClick={handleCancelEdit}>
                <CancelIcon />
                Cancel
              </div>
            </>
            ) : (
            <>
              <div className="item" onClick={() => setEditing(true)}>
                <EditIcon />
                Edit
              </div>
              <div className="item" onClick={() => onDelete(post._id)}>
                <DeleteIcon />
                Delete
              </div>
            </>
          )}
        </>
      )}
      </div>
    </div>
  </div>
  </div>
  );
};

export default Post;
