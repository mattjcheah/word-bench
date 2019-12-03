import React, { useState } from "react";
import Lobby from "./Lobby";
import ErrorPage from "./ErrorPage";
import GameBoard from "./GameBoard";

const GameRoom = ({ match, userName }) => {
  const [gameStarted, setGameStarted] = useState(true);
  if (gameStarted) {
    return <GameBoard />;
  }
  const roomID = match.params.roomID;
  if (userName && roomID) {
    return <Lobby roomID={roomID} userName={userName} />;
  }
  return <ErrorPage />;
};

export default GameRoom;
