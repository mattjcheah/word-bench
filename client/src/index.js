import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import App from "./App";

import { BrowserRouter } from "react-router-dom";

import "typeface-roboto";

var mountNode = document.getElementById("app");
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  mountNode
);
