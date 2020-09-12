import React, { useState } from "react";
import { getQuote } from "../../components/Helpers";
import InitialLanding from "./InitialLanding";
import CreateGameLanding from "./CreateGameLanding";
import JoinGameLanding from "./JoinGameLanding";

function Landing() {
  const [stage, setStage] = useState("initial");

  const quoteObject = getQuote();

  return (
    <div className="landingContainer">
      <div className="landingTitle">Welcome to WordBench</div>
      <LandingStage stage={stage} setStage={setStage} />
      <p className="aboutInfo">{quoteObject.quote}</p>
      <br />
      <p className="aboutInfo">
        <strong>{quoteObject.author}</strong>
      </p>
    </div>
  );
}

function LandingStage({ stage, setStage }) {
  switch (stage) {
    case "initial":
      return <InitialLanding setStage={setStage} />;
    case "newGame":
      return <CreateGameLanding setStage={setStage} />;
    case "joinGame":
      return <JoinGameLanding setStage={setStage} />;
    default:
      throw new Error("Stage does not exist");
  }
}

export default Landing;
