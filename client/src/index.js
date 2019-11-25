import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./components/App";

import { BrowserRouter } from "react-router-dom";

import "typeface-roboto";

var mountNode = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  mountNode
);
