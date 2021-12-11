import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// CSS + Fonts
import "./assets/css";

// Axios
import "./config/axios";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
