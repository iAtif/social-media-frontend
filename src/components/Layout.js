// src/components/Layout.js

import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useContext } from "react";
import { DarkModeContext } from "../context/darkModeContext";
import { Toaster } from "react-hot-toast";
import Navbar from "./navbar/Navbar";

const Layout = () => {
  const { darkMode } = useContext(DarkModeContext);
  const location = useLocation();
  const isAuthRoute =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div className={`theme-${darkMode ? "dark" : "light"}`}>
      {!isAuthRoute && <Navbar />}
      <div style={{ display: "flex" }}>
        <div style={{ flex: 6 }}>
          <Outlet />
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Layout;
