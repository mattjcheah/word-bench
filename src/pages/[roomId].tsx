import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useMutation, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import FETCH_ROOM from "../graphql/queries/fetchRoom";
import START_GAME from "../graphql/queries/startGame";
import COMPLETE_WORD from "../graphql/queries/completeWord";
import REPLAY_GAME from "../graphql/queries/replayGame";
import FullScreenLoading from "../components/FullScreenLoading";
import Lobby from "../components/Lobby";
import GameBoard from "../components/GameBoard";
import getQuote from "../utils/getQuote";
import { getUserId } from "../utils/user";
import { supabase } from "../client/supabase";
import { Quote } from "../config/constants";
import { FormattedRoom } from "../models/Room";
import useAppState from "../hooks/useAppState";

type Props = {
  quote: Quote;
  playerId: string;
};

const GameRoom = ({ quote, playerId }: Props) => {
  const router = useRouter();
  const { roomId } = router.query;

  const { state, dispatch } = useAppState();
  const { room, loading } = state;

  const apolloClient = useApolloClient();

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "setLoading", data: { loading: true } });
      const queryResponse = await apolloClient.query<{ room: FormattedRoom }>({
        query: FETCH_ROOM,
        variables: { roomId },
      });

      if (queryResponse && queryResponse.data.room) {
        dispatch({
          type: "loadRoom",
          data: { room: queryResponse.data.room },
        });
        dispatch({ type: "setLoading", data: { loading: false } });
      }
    };

    fetchData();
  }, [roomId]);

  const currentPlayer = room?.players.find((p) => p.id === playerId);

  useEffect(() => {
    const channel = supabase.channel(`public:rooms:roomId=eq.${roomId}`);

    channel
      .on<FormattedRoom>(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "rooms",
          filter: `roomId=eq.${roomId}`,
        },
        ({ new: newRoom }) => {
          dispatch({
            type: "updateRoom",
            data: { room: newRoom },
          });
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [roomId]);

  const [startGame] = useMutation(START_GAME, {
    variables: { roomId },
  });

  const [completeWordMutation] = useMutation(COMPLETE_WORD);

  const [replayGameMutation] = useMutation(REPLAY_GAME);

  if (loading && !room) {
    return <FullScreenLoading />;
  }

  if (!room || !currentPlayer) {
    router.replace("/");
    return null;
  }

  const shuffleLetters = () => {
    dispatch({ type: "shuffleLetters" });
  };

  const completeWord = (word: string) => {
    completeWordMutation({
      variables: { roomId, word },
    });
    dispatch({ type: "completeWord", data: { playerId, word } });
  };

  const replayGame = async (name: string) => {
    const res = await replayGameMutation({ variables: { roomId, name } });
    const nextRoomId = res.data.replayGame.id;
    router.push(`/${nextRoomId}`);
  };

  const giveUp = () => {
    dispatch({ type: "giveUp" });
  };

  if (room.stage === "LOBBY") {
    return (
      <Lobby
        roomId={room.id}
        players={room.players}
        startGame={startGame}
        quote={quote}
      />
    );
  }

  if (room.stage === "GAME" || room.stage === "COMPLETE") {
    return (
      <GameBoard
        currentPlayer={currentPlayer}
        room={room}
        completeWord={completeWord}
        shuffleLetters={shuffleLetters}
        replayGame={replayGame}
        giveUp={giveUp}
      />
    );
  }
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const playerId = getUserId(context);

  if (!playerId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { quote: getQuote(), playerId },
  };
};

export default GameRoom;
