import React from "react";
import { getQuote } from "./Helpers";

import LandingButton from "./LandingButton";

const Lobby = ({ roomId, players, startGame }) => {
  const quoteObject = getQuote();

  const handleStart = () => {
    startGame();
  };

  return (
    <div className="landingContainer">
      <div className="landingTitle">Waiting for more players...</div>
      <div className="menuBorderContainer">
        <p style={{ fontWeight: "900" }}>Room ID: {roomId}</p>
        <br />
        {players.map((player) => {
          return <p key={player.id}>{player.name}</p>;
        })}
        <br />
        <br />
        <LandingButton onClick={handleStart}>START</LandingButton>
      </div>
      <p className="aboutInfo">{quoteObject.quote}</p>
      <br />
      <p className="aboutInfo">
        <strong>{quoteObject.author}</strong>
      </p>
    </div>
  );
};

export default Lobby;
