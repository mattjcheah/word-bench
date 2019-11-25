import React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

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

  console.log(userName);
  return (
    <div className="landingContainer">
      <div className="landingTitle">Waiting for more players...</div>
      <LobbyList userName={userName} />
      <p className="aboutInfo">
        Let's put a touch more of the magic here. This is the way you take out
        your flustrations. Let's make some happy little clouds in our world.
        We'll take a little bit of Van Dyke Brown. Trees grow in all kinds of
        ways. They're not all perfectly straight. Not every limb is perfect.
        Everybody needs a friend. Steve wants reflections, so let's give him
        reflections.
      </p>
    </div>
  );
};

export default Lobby;
