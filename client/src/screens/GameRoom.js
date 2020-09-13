import React, { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Lobby from "../components/Lobby";
import { useQuery, useMutation } from "@apollo/client";

import getUserId from "../config/getUserId";
import FETCH_ROOM from "../graphql/queries/fetchRoom";
import ROOM_UPDATED from "../graphql/queries/roomUpdated";
import ServerContext from "../components/ServerContext";
import GameBoard from "../components/GameBoard";
import START_GAME from "../graphql/queries/startGame";

const GameRoom = ({ match }) => {
  const server = useContext(ServerContext);
  const roomId = match.params.roomID;

  const { subscribeToMore, data, loading } = useQuery(FETCH_ROOM, {
    variables: { roomId },
  });

  const [startGame] = useMutation(START_GAME, {
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
        startGame={startGame}
      />
    );
  }

  if (data.room.stage === "GAME") {
    return (
      <GameBoard
        currentPlayerId={getUserId()}
        roomId={data.room.id}
        players={data.room.players}
        board={data.room.board}
        completeWord={console.log}
        shuffleLetters={console.log}
      />
    );
  }

  throw new Error(`Invalid stage: ${data.room.stage}`);
};

export default GameRoom;
