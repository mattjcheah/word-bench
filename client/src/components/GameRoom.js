import React, { useContext, useState } from "react";
import Lobby from "./Lobby";
import ErrorPage from "./ErrorPage";
import ServerContext from "./ServerContext";
import GameBoard from "./GameBoard";

const GameRoom = ({ match }) => {
  const server = useContext(ServerContext);
  const [gameStarted, setGameStarted] = useState(true);

  if (gameStarted) {
    return <GameBoard />;
  }

  const roomID = match.params.roomID;
  if (roomID && server.name) {
    return <Lobby setGameStarted={setGameStarted} />;
  }
  return <ErrorPage />;
};

export default GameRoom;
