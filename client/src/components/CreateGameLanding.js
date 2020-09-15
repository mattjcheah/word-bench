import React, { useState } from "react";

import LandingButton from "./LandingButton";

const validateNewGame = (username, gameLength) => {
  const validUsername =
    username && username.length >= 3 && username.length <= 32;
  const validGameLength =
    gameLength && !isNaN(gameLength) && gameLength > 1 && gameLength < 15;

  return validUsername && validGameLength;
};

function CreateGameLanding({ setStage, createRoom }) {
  const [name, setName] = useState("");
  const [gameLength, setGameLength] = useState("5");

  const isValid = validateNewGame(name, gameLength);

  const handleChangeUserName = (event) => {
    const value = event.target.value;
    if (value.length <= 32) {
      setName(value);
    }
  };

  const handleChangeGameLength = (event) => {
    setGameLength(event.target.value);
  };

  const handleSubmit = () => {
    createRoom(name);
  };

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
          <LandingButton onClick={handleSubmit}>CREATE</LandingButton>
        ) : (
          <button className=" disabledButton" disabled={true}>
            CREATE
          </button>
        )}
        <LandingButton onClick={() => setStage("initial")}>BACK</LandingButton>
      </div>
    </div>
  );
}

export default CreateGameLanding;
