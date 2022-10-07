import { useState } from "react";
import { useMutation } from "@apollo/client";
import { useRouter } from "next/router";

import CREATE_ROOM from "../graphql/queries/createRoom";
import JOIN_ROOM from "../graphql/queries/joinRoom";
import LandingLayout from "../components/LandingLayout";
import InitialLanding from "../components/InitialLanding";
import CreateGameLanding from "../components/CreateGameLanding";
import JoinGameLanding from "../components/JoinGameLanding";
import getQuote from "../components/getQuote";

const Landing = ({ quote }) => {
  const router = useRouter();

  const [stage, setStage] = useState("initial");
  const [joinError, setJoinError] = useState("");
  const [createRoomMutation] = useMutation(CREATE_ROOM);
  const [joinRoomMutation] = useMutation(JOIN_ROOM);

  const createRoom = async (name) => {
    const res = await createRoomMutation({ variables: { name } });
    const room = res.data.createRoom;
    console.log("pushing to", room.id);
    router.push(`/${room.id}`);
  };

  const joinRoom = async (roomId, name) => {
    try {
      const res = await joinRoomMutation({
        variables: { roomId, name },
      });
      const room = res.data.joinRoom;
      console.log("pushing to", room.id);

      router.push(`/${room.id}`);
    } catch (e) {
      setJoinError(e.message);
    }
  };

  const getStage = () => {
    if (stage === "initial") return <InitialLanding setStage={setStage} />;

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
  };

  return (
    <LandingLayout title="Welcome to Word Bench" quote={quote}>
      {getStage()}
    </LandingLayout>
  );
};

export const getServerSideProps = () => {
  return {
    props: { quote: getQuote() },
  };
};

export default Landing;
