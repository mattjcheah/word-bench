import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";

import CREATE_ROOM from "../graphql/queries/createRoom";
import JOIN_ROOM from "../graphql/queries/joinRoom";
import getQuote from "../components/getQuote";
import InitialLanding from "../components/InitialLanding";
import CreateGameLanding from "../components/CreateGameLanding";
import JoinGameLanding from "../components/JoinGameLanding";

function Landing() {
  const [stage, setStage] = useState("initial");

  const quoteObject = getQuote();

  return (
    <div className="landingContainer">
      <div className="landingTitle">Welcome to WordBench</div>
      <LandingStage stage={stage} setStage={setStage} />
      <p className="aboutInfo">{quoteObject.quote}</p>
      <br />
      <p className="aboutInfo">
        <strong>{quoteObject.author}</strong>
      </p>
    </div>
  );
}

function LandingStage({ stage, setStage }) {
  const history = useHistory();
  const [joinError, setJoinError] = useState("");

  const [createRoomMutation] = useMutation(CREATE_ROOM);
  const [joinRoomMutation] = useMutation(JOIN_ROOM);

  const createRoom = async (name) => {
    const res = await createRoomMutation({ variables: { name } });
    const room = res.data.createRoom;
    history.push(`/${room.id}`);
  };

  const joinRoom = async (roomId, name) => {
    try {
      const res = await joinRoomMutation({
        variables: { roomId, name },
      });
      const room = res.data.joinRoom;
      history.push(`/${room.id}`);
    } catch (e) {
      setJoinError(e.message);
    }
  };

  switch (stage) {
    case "initial":
      return <InitialLanding setStage={setStage} />;
    case "newGame":
      return <CreateGameLanding setStage={setStage} createRoom={createRoom} />;
    case "joinGame":
      return (
        <JoinGameLanding
          setStage={setStage}
          joinRoom={joinRoom}
          clearError={() => setJoinError("")}
          joinError={joinError}
        />
      );
    default:
      throw new Error("Stage does not exist");
  }
}

export default Landing;
