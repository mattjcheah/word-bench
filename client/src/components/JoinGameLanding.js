import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { validateJoinGame } from "./Helpers";

import LandingButton from "./LandingButton";
import ErrorModal from "./ErrorModal";

function JoinGameLanding({ setStage, server }) {
  const [roomID, setRoomID] = useState("");
  const [name, setName] = useState("");

  const [isValid, validMessage] = validateJoinGame(roomID, name);

  const handleChangeRoomNumber = (event) => {
    setRoomID(event.target.value);
  };

  const handleChangeUserName = (event) => {
    const value = event.target.value;
    if (value.length <= 32) {
      setName(value);
    }
  };

  const handleSubmit = () => {
    server.socket.joinRoom(name, roomID);
  };

  if (server.roomID) {
    return <Redirect to={`/${server.roomID}`} />;
  }

  return (
    <div>
      <ErrorModal
        open={Boolean(server.joinError)}
        closeModal={server.clearError}
        message={server.joinError}
      />
      <div className="menuBorderContainer">
        <div className="inputFieldContainer">
          <input
            type="text"
            name="room_code"
            placeholder="Enter a room id..."
            value={roomID}
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
          <span tooltip={validMessage} flow="left">
            <button className=" disabledButton" disabled={true}>
              JOIN
            </button>
          </span>
        )}
        <LandingButton onClick={() => setStage("initial")}>BACK</LandingButton>
      </div>
    </div>
  );
}

export default JoinGameLanding;
