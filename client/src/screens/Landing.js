import React, { useState, useContext } from "react";
import { getQuote } from "../components/Helpers";
import InitialLanding from "../components/InitialLanding";
import CreateGameLanding from "../components/CreateGameLanding";
import JoinGameLanding from "../components/JoinGameLanding";
import ServerContext from "../components/ServerContext";

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
  const server = useContext(ServerContext);

  switch (stage) {
    case "initial":
      return <InitialLanding setStage={setStage} />;
    case "newGame":
      return <CreateGameLanding setStage={setStage} server={server} />;
    case "joinGame":
      return <JoinGameLanding setStage={setStage} server={server} />;
    default:
      throw new Error("Stage does not exist");
  }
}

export default Landing;
