import { ChangeEventHandler, useState } from "react";

import { LandingInputContainer, LandingInput } from "../LandingInput";
import LandingButton from "../LandingButton";
import ErrorModal from "../ErrorModal";

const validateJoinGame = (roomNumber: string, username: string): boolean => {
  const validRoomNumber = roomNumber.length > 0 && roomNumber.length <= 4;
  const validUsername = username.length > 0 && username.length <= 32;

  return !!(validRoomNumber && validUsername);
};

type Props = {
  setStage: (stage: string) => void;
  joinRoom: (roomId: string, name: string) => void;
  joinError: string;
  clearError: () => void;
};

function JoinGameLanding({ setStage, joinRoom, joinError, clearError }: Props) {
  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const isValid = validateJoinGame(roomId, name);

  const handleChangeRoomNumber: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setRoomId(event.target.value);
  };

  const handleChangeUserName: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
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
      <LandingButton onClick={() => setStage("initial")}>BACK</LandingButton>
      {isValid ? (
        <LandingButton onClick={handleSubmit}>JOIN</LandingButton>
      ) : (
        <LandingButton disabled>JOIN</LandingButton>
      )}
    </div>
  );
}

export default JoinGameLanding;
