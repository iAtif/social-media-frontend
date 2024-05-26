import "./share.scss";
import React, { useState } from "react";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useAuth } from "../../context/Auth";
import toast from "react-hot-toast";
import user from "../images/user.jpg";
import axios from "axios";

const Share = () => {
  const [auth] = useAuth();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const baseUrl = process.env.REACT_APP_BACKEND_API_URL;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("description", description);
    if (image) formData.append("image", image);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "multipart/form-data",
        },
      };
      await axios.post(`${baseUrl}/post`, formData, config);
      toast.success("Post created successfully");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Failed to create post");
    }
  };

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <img src={user} alt="user" />
          <input
            type="text"
            placeholder={`What's on your mind ${auth?.user?.username}?`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Selected" />
          </div>
        )}
        <hr />
        <div className="bottom">
          <div className="left">
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <label htmlFor="file">
              <div className="item">
                <InsertPhotoIcon />
                <span>Add Image</span>
              </div>
            </label>
          </div>
          <div className="right">
            <button onClick={handleSubmit}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
