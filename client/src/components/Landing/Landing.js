import React, { useState } from "react";
import { getQuote } from "../Helpers";
import "./tooltips.scss";
import RoomContext from "./RoomContext";
import InitialLanding from "./InitialLanding";
import CreateGameLanding from "./CreateGameLanding";
import JoinGameLanding from "./JoinGameLanding";
import useRedirect from "./useRedirect";

function Landing({ location }) {
  const [stage, setStage] = useState("initial");
  const [roomID, setRoomID] = useState("");

  useRedirect(location, roomID, setRoomID, setStage);

  const quoteObject = getQuote();

  return (
    <div className="landingContainer">
      <div className="landingTitle">Welcome to WordBench</div>
      <RoomContext.Provider value={roomID}>
        <LandingStage stage={stage} setStage={setStage} />
      </RoomContext.Provider>
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
