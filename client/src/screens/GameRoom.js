import React, { useContext, useEffect } from "react";
import Lobby from "../components/Lobby";
import ServerContext from "../components/ServerContext";
import GameBoard from "../components/GameBoard";
import { Redirect } from "react-router-dom";
import { useQuery } from "@apollo/client";
import FETCH_ROOM from "../graphql/queries/fetchRoom";
import ROOM_UPDATED from "../graphql/queries/roomUpdated";

const GameRoom = ({ match }) => {
  const server = useContext(ServerContext);
  const roomId = match.params.roomID;

  const { subscribeToMore, data, loading } = useQuery(FETCH_ROOM, {
    variables: { roomId },
  });

  useEffect(
    () =>
      subscribeToMore({
        document: ROOM_UPDATED,
        variables: { roomId },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData.data) return prev;
          const newRoom = subscriptionData.data.roomUpdated;
          return {
            ...prev,
            room: newRoom,
          };
        },
      }),
    [subscribeToMore, roomId]
  );

  if (loading && !data) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <Redirect to="/" />;
  }

  if (data.room.stage === "LOBBY") {
    return (
      <Lobby
        roomId={data.room.id}
        players={data.room.players}
        startGame={() => console.log("startgame")}
      />
    );
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

  throw new Error(`Invalid stage: ${data.room.stage}`);
};

export default GameRoom;
