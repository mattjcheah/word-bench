import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { getQuote } from "./Helpers";
import ServerContext from "./ServerContext";

function Lobby() {
  const server = useContext(ServerContext);
  const players = Object.values(server.players);
  const quoteObject = getQuote();

  const handleStart = () => {
    server.socket.startGame();
  };

  return (
    <div className="landingContainer">
      <div className="landingTitle">Waiting for more players...</div>
      <div className="menuBorderContainer">
        <p style={{ fontWeight: "900" }}>Room ID: {server.roomID}</p>
        <br />
        {players.map(player => {
          return <p key={player.id}>{player.name}</p>;
        })}
        <br />
        <br />
        <button className="landingButton" onClick={handleStart}>
          Start
        </button>
        <Link to="/" className="landingButton">
          QUIT
        </Link>
      </div>
      <p className="aboutInfo">{quoteObject.quote}</p>
      <br />
      <p className="aboutInfo">
        <strong>{quoteObject.author}</strong>
      </p>
    </div>
  );
}

export default Lobby;
