import React from "react";
import LandingButton from "./LandingButton";

function InitialLanding({ setStage }) {
  return (
    <div>
      <LandingButton onClick={() => setStage("newGame")}>CREATE</LandingButton>
      <LandingButton onClick={() => setStage("joinGame")}>JOIN</LandingButton>
    </div>
  );
}

export default InitialLanding;
