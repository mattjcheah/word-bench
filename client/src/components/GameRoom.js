import React from "react";
import Lobby from "./Lobby";
import ErrorPage from "./ErrorPage";

const GameRoom = ({ match, userName }) => {
  const roomID = match.params.roomID;
  if (userName && roomID) {
    return <Lobby roomID={roomID} userName={userName} />;
  }
  return <ErrorPage />;
};

export default GameRoom;
