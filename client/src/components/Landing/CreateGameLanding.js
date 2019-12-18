import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import { validateNewGame } from "../Helpers";
import ServerContext from "../ServerContext";

function CreateGameLanding({ setStage }) {
  const [name, setName] = useState("");
  const [gameLength, setGameLength] = useState("5");

  const [isValid, validMessage] = validateNewGame(name, gameLength);

  const server = useContext(ServerContext);

  const handleChangeUserName = event => {
    setName(event.target.value);
  };

  const handleChangeGameLength = event => {
    setGameLength(event.target.value);
  };

  const handleSubmit = () => {
    const socket = server.socket;

    socket.createRoom(name);
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
            name="user_name"
            placeholder="Enter your name..."
            value={name}
            onChange={handleChangeUserName}
            className="inputField"
            autoComplete="off"
          />
          <div style={{ margin: "20px auto" }}>
            <div style={{ display: "inline-block" }}>
              Game Length (minutes):
            </div>
            <input
              style={{ display: "inline-block" }}
              type="text"
              name="user_name"
              value={gameLength}
              onChange={handleChangeGameLength}
              className="inputField inputFieldNumber"
              autoComplete="off"
            />
          </div>
        </div>
        {isValid ? (
          <button className="landingButton" onClick={handleSubmit}>
            CREATE
          </button>
        ) : (
          <span tooltip={validMessage} flow="left">
            <button className=" disabledButton" disabled={true}>
              CREATE
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

export default CreateGameLanding;
