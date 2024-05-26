import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/Auth";
import axios from "axios";
import "./login.scss";

const BASE_URL = process.env.REACT_APP_BACKEND_API_URL;

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  //Form Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      if (res.data.success) {
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate("/");
        toast.success("Login Successful");
      } else {
        console.log(res);
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
    <div className="login">
      <div className="card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
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
          <button>Login</button>
        </form>
        <div className="register-prompt">
          <span>Don't have an account?</span>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
