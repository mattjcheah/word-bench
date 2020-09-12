import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { validateJoinGame } from "./Helpers";

import LandingButton from "./LandingButton";
import ErrorModal from "./ErrorModal";

function JoinGameLanding({
  setStage,
  roomId: existingRoomId,
  joinRoom,
  joinError,
  clearError,
}) {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const [isValid] = validateJoinGame(roomId, name);

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
    joinRoom(name, roomId);
  };

  if (existingRoomId) {
    return <Redirect to={`/${existingRoomId}`} />;
  }

  return (
    <div>
      <ErrorModal
        open={Boolean(joinError)}
        closeModal={clearError}
        message={joinError}
      />
      <div className="menuBorderContainer">
        <div className="inputFieldContainer">
          <input
            type="text"
            name="room_code"
            placeholder="Enter a room id..."
            value={roomId}
            onChange={handleChangeRoomNumber}
            className="inputField"
            autoComplete="off"
          />
          <input
            type="text"
            name="user_name"
            placeholder="Enter your name..."
            value={name}
            onChange={handleChangeUserName}
            className="inputField"
            autoComplete="off"
          />
        </div>
        {isValid ? (
          <LandingButton onClick={handleSubmit}>JOIN</LandingButton>
        ) : (
          <button className="disabledButton" disabled={true}>
            JOIN
          </button>
        )}
        <LandingButton onClick={() => setStage("initial")}>BACK</LandingButton>
      </div>
    </div>
  );
}

export default JoinGameLanding;
