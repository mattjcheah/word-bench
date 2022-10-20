import { useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import lodash from "lodash";
import { useRouter } from "next/router";
import getUserId from "../config/getUserId";
import { cache } from "../graphql/apollo";
import FETCH_ROOM from "../graphql/queries/fetchRoom";
import START_GAME from "../graphql/queries/startGame";
import COMPLETE_WORD from "../graphql/queries/completeWord";
import REPLAY_GAME from "../graphql/queries/replayGame";
import FullScreenLoading from "../components/FullScreenLoading";
import Lobby from "../components/Lobby";
import GameBoard from "../components/GameBoard";
import getQuote from "../utils/getQuote";
import { supabase } from "../client/supabase";
import { Quote } from "../config/constants";
import { FormattedRoom, Player } from "../models/Room";

type Props = {
  quote: Quote;
};

const GameRoom = ({ quote }: Props) => {
  const router = useRouter();

  const { roomId } = router.query;

  const { data, loading } = useQuery<{ room: FormattedRoom }>(FETCH_ROOM, {
    variables: { roomId },
  });

  const currentPlayer = data?.room.players.find((p) => p.id === getUserId());

  useEffect(() => {
    supabase
      .from(`rooms:roomId=eq.${roomId}`)
      .on("UPDATE", ({ new: { roomId, stage, players } }) => {
        cache.modify({
          id: `Room:${roomId}`,
          fields: {
            stage(cachedStage) {
              return cachedStage === "COMPLETE" ? cachedStage : stage;
            },
            players(cachedPlayers: Player[]) {
              return players.map((newPlayer: Player) => {
                const cachedPlayer = cachedPlayers.find(
                  (p) => p.id === newPlayer.id
                );

                if (!cachedPlayer) return newPlayer;

                return {
                  ...newPlayer,
                  completedWords: Array.from(
                    new Set([
                      ...cachedPlayer.completedWords,
                      ...newPlayer.completedWords,
                    ])
                  ),
                };
              });
            },
          },
        });
      })
      .subscribe();
  }, [roomId]);

  const [startGame] = useMutation(START_GAME, {
    variables: { roomId },
  });

  const [completeWordMutation] = useMutation(COMPLETE_WORD);

  const [replayGameMutation] = useMutation(REPLAY_GAME);

  if (loading && !data) {
    return <FullScreenLoading />;
  }

  if (!data || !currentPlayer) {
    router.replace("/");
    return null;
  }

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

  const completeWord = (word: string) => {
    completeWordMutation({
      variables: { roomId, word },
    });
    cache.modify({
      id: cache.identify(data.room),
      fields: {
        players(cachedPlayers: Player[]) {
          return cachedPlayers.map((p) =>
            p.id === currentPlayer.id
              ? {
                  ...p,
                  completedWords: [...p.completedWords, word],
                }
              : p
          );
        },
      },
    });
  };

  const replayGame = async (name: string) => {
    const res = await replayGameMutation({ variables: { roomId, name } });
    const nextRoomId = res.data.replayGame.id;
    router.push(`/${nextRoomId}`);
  };

  if (data.room.stage === "LOBBY") {
    return (
      <Lobby
        roomId={data.room.id}
        players={data.room.players}
        startGame={startGame}
        quote={quote}
      />
    );
  }

  if (data.room.stage === "GAME" || data.room.stage === "COMPLETE") {
    return (
      <GameBoard
        currentPlayer={currentPlayer}
        room={data.room}
        completeWord={completeWord}
        shuffleLetters={shuffleLetters}
        replayGame={replayGame}
      />
    );
  }

  throw new Error(`Invalid stage: ${data.room.stage}`);
};

export const getServerSideProps = () => {
  return {
    props: { quote: getQuote() },
  };
};

export default GameRoom;
