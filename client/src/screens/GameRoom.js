import React, { useContext } from "react";
import Lobby from "../components/Lobby";
import ServerContext from "../components/ServerContext";
import GameBoard from "../components/GameBoard";
import { Redirect } from "react-router-dom";

const GameRoom = ({ match }) => {
  const server = useContext(ServerContext);

  if (server.stage === "GAME") {
    return <GameBoard />;
  }

  const roomID = match.params.roomID;
  if (roomID && server.name) {
    return (
      <Lobby
        roomId={server.roomID}
        players={Object.values(server.players)}
        startGame={server.socket.startGame}
      />
    );
  }

  return <Redirect to={`/`} />;
};

export default GameRoom;
