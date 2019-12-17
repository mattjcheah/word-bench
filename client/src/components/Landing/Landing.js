import React, { useState, useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
// import Popup from "reactjs-popup";
import { validateJoinGame, getQuote } from "../Helpers";
import "./tooltips.scss";
import ServerContext from "../ServerContext";
import NewGameLanding from "./NewGameLanding";

const RoomContext = React.createContext();

function Landing({ location }) {
  const [stage, setStage] = useState("initial");
  const [roomID, setRoomID] = useState("");

  useEffect(() => {
    if (!roomID) {
      const urlRoomID = new URLSearchParams(location.search).get("roomID");
      if (urlRoomID) {
        setRoomID(urlRoomID);
        setStage("joinGame");
      }
    }
  });

  const quoteObject = getQuote();

  return (
    <div className="landingContainer">
      <div className="landingTitle">Welcome to WordBench</div>
      <RoomContext.Provider value={roomID}>
        <LandingStage stage={stage} setStage={setStage} />
      </RoomContext.Provider>
      <p className="aboutInfo">{quoteObject.quote}</p>
      <br />
      <p className="aboutInfo">
        <strong>{quoteObject.author}</strong>
      </p>
    </div>
  );
}

function LandingStage({ stage, setStage }) {
  switch (stage) {
    case "initial":
      return <InitialLanding setStage={setStage} />;
    case "newGame":
      return <NewGameLanding setStage={setStage} />;
    case "joinGame":
      return <JoinGameLanding setStage={setStage} />;
    default:
      return <InitialLanding />;
  }
}

function InitialLanding({ setStage }) {
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
}

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

export default Landing;
