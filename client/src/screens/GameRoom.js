import React, { useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import lodash from "lodash";

import getUserId from "../config/getUserId";
import { cache } from "../graphql/apollo";
import FETCH_ROOM from "../graphql/queries/fetchRoom";
import ROOM_UPDATED from "../graphql/queries/roomUpdated";
import START_GAME from "../graphql/queries/startGame";
import COMPLETE_WORD from "../graphql/queries/completeWord";
import REPLAY_GAME from "../graphql/queries/replayGame";
import FullScreenLoading from "../components/FullScreenLoading";
import Lobby from "../components/Lobby";
import GameBoard from "../components/GameBoard";
import CompletedGameBoard from "../components/CompletedGameBoard";

const GameRoom = ({ match }) => {
  const roomId = match.params.roomID;

  const history = useHistory();

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
            room: {
              ...prev.room,
              ...newRoom,
            },
          };
        },
      }),
    [subscribeToMore, roomId]
  );

  const [startGame] = useMutation(START_GAME, {
    variables: { roomId },
  });

  const [completeWordMutation] = useMutation(COMPLETE_WORD);

  const [replayGameMutation] = useMutation(REPLAY_GAME);

  const shuffleLetters = () => {
    cache.modify({
      id: cache.identify(data.room),
      fields: {
        board(cachedBoard) {
          return {
            ...cachedBoard,
            letters: lodash.shuffle(cachedBoard.letters),
          };
        },
      },
    });
  };

  if (loading && !data) {
    return <FullScreenLoading />;
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
    const completeWord = (currentPlayer, word) => {
      completeWordMutation({
        variables: { roomId, word },
        optimisticResponse: {
          __typename: "Mutation",
          completeWord: {
            ...currentPlayer,
            completedWords: [...currentPlayer.completedWords, word],
          },
        },
      });
    };

    return (
      <GameBoard
        currentPlayerId={getUserId()}
        room={data.room}
        completeWord={completeWord}
        shuffleLetters={shuffleLetters}
      />
    );
  }

  if (data.room.stage === "COMPLETE") {
    const replayGame = async (name) => {
      const res = await replayGameMutation({ variables: { roomId, name } });
      const nextRoomId = res.data.replayGame.id;
      history.push(`/${nextRoomId}`);
    };

    return (
      <CompletedGameBoard
        currentPlayerId={getUserId()}
        players={data.room.players}
        board={data.room.board}
        replayGame={replayGame}
      />
    );
  }

  throw new Error(`Invalid stage: ${data.room.stage}`);
};

export default GameRoom;
