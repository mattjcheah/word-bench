import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { validateJoinGame } from "../Helpers";
import ServerContext from "../ServerContext";
import RoomContext from "./RoomContext";

function JoinGameLanding({ setStage }) {
  const urlRoomID = useContext(RoomContext);
  const [roomID, setRoomID] = useState(urlRoomID);
  const [name, setName] = useState("");

  const [isValid, validMessage] = validateJoinGame(roomID, name);

  const server = useContext(ServerContext);

  const handleChangeRoomNumber = event => {
    setRoomID(event.target.value);
  };

  const handleChangeUserName = event => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    const socket = server.socket;

    socket.joinRoom(name, roomID);
  };

  if (server.roomID) {
    return <Redirect to={`/${server.roomID}`} />;
  }

  return (
    <div>
      <div className="menuBorderContainer">
        <div className="inputFieldContainer">
          <input
            type="text"
            name="room_code"
            placeholder="Enter a room id..."
            value={roomID}
            onChange={handleChangeRoomNumber}
            className="inputField"
          />
          <input
            type="text"
            name="user_name"
            placeholder="Enter your name..."
            value={name}
            onChange={handleChangeUserName}
            className="inputField"
          />
        </div>
        {isValid ? (
          <button className="landingButton" onClick={handleSubmit}>
            JOIN
          </button>
        ) : (
          <span tooltip={validMessage} flow="left">
            <button className=" disabledButton" disabled={true}>
              JOIN
            </button>
          </span>
        )}
        <button className="landingButton" onClick={() => setStage("initial")}>
          BACK
        </button>
      </div>
    </div>
  );
}

export default JoinGameLanding;
