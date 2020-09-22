import React, { useState } from "react";

import { LandingInputContainer, LandingInput } from "./LandingInput";
import LandingButton from "./LandingButton";
import ErrorModal from "./ErrorModal";

const validateJoinGame = (roomNumber, username) => {
  const validRoomNumber =
    roomNumber && roomNumber.length >= 1 && roomNumber.length <= 4;
  const validUsername =
    username && username.length >= 3 && username.length <= 32;

  return validRoomNumber && validUsername;
};

function JoinGameLanding({ setStage, joinRoom, joinError, clearError }) {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const isValid = validateJoinGame(roomId, name);

  const handleChangeRoomNumber = (event) => {
    setRoomId(event.target.value);
  };

  const handleChangeUserName = (event) => {
    const value = event.target.value;
    if (value.length <= 32) {
      setName(value);
    }
  };

  const handleSubmit = () => {
    joinRoom(roomId, name);
  };

  return (
    <div>
      <ErrorModal
        open={Boolean(joinError)}
        closeModal={clearError}
        message={joinError}
      />
      <LandingInputContainer>
        <LandingInput
          type="text"
          name="room_code"
          placeholder="Enter a room id..."
          value={roomId}
          onChange={handleChangeRoomNumber}
          autoComplete="off"
        />
        <LandingInput
          type="text"
          name="user_name"
          placeholder="Enter your name..."
          value={name}
          onChange={handleChangeUserName}
          autoComplete="off"
        />
      </LandingInputContainer>
      {isValid ? (
        <LandingButton onClick={handleSubmit}>JOIN</LandingButton>
      ) : (
        <LandingButton disabled>JOIN</LandingButton>
      )}
      <LandingButton onClick={() => setStage("initial")}>BACK</LandingButton>
    </div>
  );
}

export default JoinGameLanding;
