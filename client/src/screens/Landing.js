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
  const roomId = server.roomID;

  switch (stage) {
    case "initial":
      return <InitialLanding setStage={setStage} />;
    case "newGame":
      return (
        <CreateGameLanding
          setStage={setStage}
          roomId={roomId}
          createRoom={server.socket.createRoom}
        />
      );
    case "joinGame":
      return (
        <JoinGameLanding
          setStage={setStage}
          roomId={roomId}
          joinRoom={server.socket.joinRoom}
          clearError={server.clearError}
          joinError={server.joinError}
        />
      );
    default:
      throw new Error("Stage does not exist");
  }
}

export default Landing;
