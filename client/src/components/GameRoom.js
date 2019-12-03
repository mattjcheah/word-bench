import React, { useContext } from "react";
import Lobby from "./Lobby";
import ErrorPage from "./ErrorPage";
import ServerContext from "./ServerContext";

const GameRoom = ({ match }) => {
  const server = useContext(ServerContext);
  const roomID = match.params.roomID;
  if (roomID && server.name) {
    return <Lobby />;
  }
  return <ErrorPage />;
};

export default GameRoom;
