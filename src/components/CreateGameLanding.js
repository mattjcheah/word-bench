import React, { useState } from "react";

import { LandingInputContainer, LandingInput } from "./LandingInput";
import LandingButton from "./LandingButton";

const validateNewGame = (username) => {
  const validUsername =
    username && username.length >= 3 && username.length <= 32;

  return validUsername;
};

function CreateGameLanding({ setStage, createRoom }) {
  const [name, setName] = useState("");

  const isValid = validateNewGame(name);

  const handleChangeUserName = (event) => {
    const value = event.target.value;
    if (value.length <= 32) {
      setName(value);
    }
  };

  const handleSubmit = () => {
    setStage("loading");
    createRoom(name);
  };

  return (
    <div>
      <LandingInputContainer>
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
        <LandingButton onClick={handleSubmit}>CREATE</LandingButton>
      ) : (
        <LandingButton disabled>CREATE</LandingButton>
      )}
      <LandingButton onClick={() => setStage("initial")}>BACK</LandingButton>
    </div>
  );
}

export default CreateGameLanding;
