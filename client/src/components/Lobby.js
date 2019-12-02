import React from "react";
import { Link } from "react-router-dom";
import { getQuote } from "./Helper";
import "../styles.scss";

const ROOM_ID = "fog2ka";

const PLAYERS = ["player1", "player2", "player3", "player4"];

const LobbyList = props => {
  const { userName } = props;

  return (
    <div className="menuBorderContainer">
      <p style={{ fontWeight: "900" }}>Room ID: {ROOM_ID}</p>
      <br />
      <p>{userName}</p>
      {PLAYERS.map(player => {
        return <p key={player}>{player}</p>;
      })}
      <br />
      <br />
      <button className="landingButton">READY</button>
      <Link to="/" className="landingButton">
        QUIT
      </Link>
    </div>
  );
};

const Lobby = props => {
  const { userName } = props;

  const quoteObject = getQuote();

  return (
    <div className="landingContainer">
      <div className="landingTitle">Waiting for more players...</div>
      <LobbyList userName={userName} />
      <p className="aboutInfo">{quoteObject.quote}</p>
      <br />
      <p className="aboutInfo">
        <strong>{quoteObject.author}</strong>
      </p>
    </div>
  );
};

export default Lobby;
