import React from "react";
import { Link } from "react-router-dom";

class ErrorPage extends React.Component {
  render() {
    return (
      <div className="landingContainer">
        <div className="landingTitle">Nothing here...</div>
        <div className="menuBorderContainer">
          <Link to="/" className="landingButton">
            HOME
          </Link>
        </div>
      </div>
    );
  }
}

export default ErrorPage;
