import React from "react";
import LandingButton from "./LandingButton";

function InitialLanding({ setStage }) {
  return (
    <div>
      <div className="menuBorderContainer">
        <LandingButton onClick={() => setStage("newGame")}>
          CREATE
        </LandingButton>
        <LandingButton onClick={() => setStage("joinGame")}>JOIN</LandingButton>
      </div>
    </div>
  );
}

export default InitialLanding;
