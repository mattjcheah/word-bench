import React, { useContext } from "react";
import Lobby from "../components/Lobby";
import ServerContext from "../components/ServerContext";
import GameBoard from "../components/GameBoard";
import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import FETCH_ROOM from "../graphql/queries/fetchRoom";

const GameRoom = ({ match }) => {
  const server = useContext(ServerContext);
  const roomID = match.params.roomID;

  const { data, loading } = useQuery(FETCH_ROOM, {
    variables: { roomId: roomID },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <Redirect to="/" />;
  }

  if (data.room.stage === "GAME") {
    return (
      <GameBoard
        currentPlayerId={server.socket.socket.id}
        roomId={server.roomID}
        players={server.players}
        board={server.board}
        completeWord={server.socket.completeWord}
        shuffleLetters={server.socket.shuffleLetters}
      />
    );
  }

  return (
    <Lobby
      roomId={data.room.id}
      players={data.room.players}
      startGame={() => console.log("startgame")}
    />
  );
};

export default GameRoom;
