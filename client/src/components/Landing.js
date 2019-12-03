import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { validateNewGame, validateJoinGame, getQuote } from "./Helper";
import { connectToServer } from "../services/socket";
import "./tooltips.scss";

function Landing({ setUserName }) {
  const [stage, setStage] = useState("initial");

  const quoteObject = getQuote();

  return (
    <div className="landingContainer">
      <div className="landingTitle">Welcome to WordBench</div>
      <LandingStage
        stage={stage}
        setStage={setStage}
        setUserName={setUserName}
      />
      <p className="aboutInfo">{quoteObject.quote}</p>
      <br />
      <p className="aboutInfo">
        <strong>{quoteObject.author}</strong>
      </p>
    </div>
  );
}

function LandingStage({ stage, setStage, setUserName }) {
  switch (stage) {
    case "initial":
      return <InitialLanding setStage={setStage} />;
    case "newGame":
      return <NewGameLanding setStage={setStage} setUserName={setUserName} />;
    case "joinGame":
      return <JoinGameLanding setStage={setStage} setUserName={setUserName} />;
    default:
      return <InitialLanding />;
  }
}

const InitialLanding = props => {
  const { setStage } = props;
  return (
    <div>
      <div className="menuBorderContainer">
        <button className="landingButton" onClick={() => setStage("newGame")}>
          CREATE
        </button>
        <button className="landingButton" onClick={() => setStage("joinGame")}>
          JOIN
        </button>
      </div>
    </div>
  );
};

function NewGameLanding({ setStage, setUserName }) {
  const [name, setName] = useState("");
  const [gameLength, setGameLength] = useState("5");
  const [roomID, setRoomID] = useState(null);

  const [isValid, validMessage] = validateNewGame(name, gameLength);

  const handleChangeUserName = event => {
    setName(event.target.value);
  };

  const handleChangeGameLength = event => {
    setGameLength(event.target.value);
  };

  const handleSubmit = () => {
    setUserName(name);

    const socket = connectToServer();

    socket.emit("createRoom", { name });

    socket.on("roomStatus", response => {
      if (response.status === "SUCCESS") {
        setRoomID(response.roomID);
      }
      socket.close();
    });
  };

  if (roomID) {
    return <Redirect to={`/${roomID}`} />;
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

function JoinGameLanding({ setStage, setUserName }) {
  const [roomID, setRoomID] = useState("");
  const [name, setName] = useState("");

  const [isValid, validMessage] = validateJoinGame(roomID, name);

  const handleChangeRoomNumber = event => {
    setRoomID(event.target.value);
  };

  const handleChangeUserName = event => {
    setName(event.target.value);
  };

  const handleSubmit = () => {
    setUserName(name);
  };

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

export default Landing;
