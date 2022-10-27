import { GetServerSideProps } from "next";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import CREATE_ROOM from "../graphql/queries/createRoom";
import JOIN_ROOM from "../graphql/queries/joinRoom";
import LandingLayout from "../components/LandingLayout";
import InitialLanding from "../components/InitialLanding";
import CreateGameLanding from "../components/CreateGameLanding";
import JoinGameLanding from "../components/JoinGameLanding";
import getQuote from "../utils/getQuote";
import { initUserId } from "../utils/user";
import FullScreenLoading from "../components/FullScreenLoading";
import { Quote } from "../config/constants";

type Props = {
  quote: Quote;
};

const Landing = ({ quote }: Props) => {
  const router = useRouter();

  const [stage, setStage] = useState("initial");
  const [joinError, setJoinError] = useState("");
  const [createRoomMutation] = useMutation(CREATE_ROOM);
  const [joinRoomMutation] = useMutation(JOIN_ROOM);

  const createRoom = async (name: string) => {
    const res = await createRoomMutation({ variables: { name } });
    const room = res.data.createRoom;
    router.push(`/${room.id}`);
  };

  const joinRoom = async (roomId: string, name: string) => {
    try {
      const res = await joinRoomMutation({
        variables: { roomId, name },
      });
      const room = res.data.joinRoom;
      router.push(`/${room.id}`);
    } catch (e) {
      setStage("joinGame");
      setJoinError(e instanceof Error ? e.message : "Something went wrong");
    }
  };

  const getStage = (): JSX.Element => {
    if (stage === "initial") return <InitialLanding setStage={setStage} />;

    if (stage === "loading") return <FullScreenLoading />;

    if (stage === "newGame")
      return <CreateGameLanding setStage={setStage} createRoom={createRoom} />;

    if (stage === "joinGame")
      return (
        <JoinGameLanding
          setStage={setStage}
          joinRoom={joinRoom}
          clearError={() => setJoinError("")}
          joinError={joinError}
        />
      );

    return <></>;
  };

  return (
    <LandingLayout title="Welcome to Word Bench" quote={quote}>
      {getStage()}
    </LandingLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  initUserId(context);

  return {
    props: { quote: getQuote() },
  };
};

export default Landing;
