import "./navbar.scss";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { DarkModeContext } from "../../context/darkModeContext";
import { useAuth } from "../../context/Auth";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import user from "../images/user.jpg";
import toast from "react-hot-toast";

const Navbar = () => {
  const { toggle, darkMode } = useContext(DarkModeContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <div className="navbar">
      <div className="left">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span>Social Media</span>
        </Link>
        {darkMode ? (
          <WbSunnyOutlinedIcon onClick={toggle} />
        ) : (
          <DarkModeOutlinedIcon onClick={toggle} />
        )}
      </div>
      <div className="right">
        <div className="user">
          <img src={user} alt="user" />
          <span onClick={toggleDropdown}>
            {auth?.user?.username}{" "}
            {dropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </span>
          {dropdownOpen && (
            <div className="dropdown">
              <Link
                to={`/profile`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name" onClick={toggleDropdown}>
                  <PersonIcon />
                  Profile
                </span>
              </Link>
              <span onClick={handleLogout}>
                <LogoutIcon />
                Logout
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
