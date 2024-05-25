import React from "react";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./context/Auth";
import { DarkModeContextProvider } from "./context/darkModeContext";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthProvider>
    <DarkModeContextProvider>
      <App />
    </DarkModeContextProvider>
  </AuthProvider>
);
