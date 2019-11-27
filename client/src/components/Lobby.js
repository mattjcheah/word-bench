import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getQuote } from "./Helper";
import "../styles.css";
import { gameStages } from "./Constants";
import { connectToServer } from "../services/socket";

function Lobby({ userName, roomID }) {
  const [stage, setStage] = useState(gameStages.lobby);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const socket = connectToServer();
    socket.emit("joinRoom", { name: userName, roomID });

    socket.on("roomStatus", response => {
      console.log(response.players);
      if (response.status === "SUCCESS") {
        setPlayers(response.players);
      }
    });
  }, [userName, roomID]);

  const quoteObject = getQuote();

  return (
    <div className="landingContainer">
      <div className="landingTitle">Waiting for more players...</div>
      <div className="menuBorderContainer">
        <p style={{ fontWeight: "900" }}>Room ID: {roomID}</p>
        <br />
        {players.map(player => {
          return <p key={player.id}>{player.name}</p>;
        })}
        <br />
        <br />
        <button className="landingButton">READY</button>
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
