import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast  from 'react-hot-toast';
import axios from "axios";
import "./register.scss";

const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmPassword, setconfirmpassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${BASE_URL}/auth/register`,
        {
          username,
          email,
          password,
          confirmPassword,
        }
      );
      // Check if registration was successful
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login")
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // If the server returns a 400 error, display the error message
        toast.error(error.response.data.message);
      } else {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setusername(e.target.value)} 
              placeholder="Username" 
              required
            />
            <input 
              type="email" 
              value={email}
              onChange={(e) => setemail(e.target.value)} 
              placeholder="Email" 
              required
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setpassword(e.target.value)} 
              placeholder="Password"
              required 
            />
            <input 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setconfirmpassword(e.target.value)} 
              placeholder="Confirm Password"
              required 
            />
            <button>Register</button>
          </form>
          <div className="login-prompt">
            <span>Already have an account?</span>
            <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
