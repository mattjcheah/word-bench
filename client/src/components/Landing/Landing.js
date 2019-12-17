import React, { useState, useEffect } from "react";
import { getQuote } from "../Helpers";
import "./tooltips.scss";
import RoomContext from "./RoomContext";
import NewGameLanding from "./NewGameLanding";
import JoinGameLanding from "./JoinGameLanding";

function Landing({ location }) {
  const [stage, setStage] = useState("initial");
  const [roomID, setRoomID] = useState("");

  useEffect(() => {
    if (!roomID) {
      const urlRoomID = new URLSearchParams(location.search).get("roomID");
      if (urlRoomID) {
        setRoomID(urlRoomID);
        setStage("joinGame");
      }
    }
  });

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
      return <NewGameLanding setStage={setStage} />;
    case "joinGame":
      return <JoinGameLanding setStage={setStage} />;
    default:
      return <InitialLanding />;
  }
}

function InitialLanding({ setStage }) {
  return (
    <div>
      <div className="menuBorderContainer">
        <button className="landingButton" onClick={() => setStage("newGame")}>
          CREATE
        </button>
        <button className="landingButton" onClick={() => setStage("joinGame")}>
          JOIN
        </button>
      </div>
    </div>
  );
}

export default Landing;
