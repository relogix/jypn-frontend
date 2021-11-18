import React from "react";
import ReactDOM from "react-dom";
import "./assets/css/index";
import App from "./App";

// Axios
import "./config/axios";

ReactDOM.render(
  <React.Fragment>
    <App />
  </React.Fragment>,
  document.getElementById("root")
);
