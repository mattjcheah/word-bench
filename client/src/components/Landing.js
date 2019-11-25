import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles.css";

const ROOM_ID = "/fog2ka";

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

const NewGameLanding = props => {
  const { setStage } = props;

  const [userName, setUserName] = useState("");
  const [gameLength, setGameLength] = useState("5");

  const handleChangeUserName = event => {
    setUserName(event.target.value);
  };

  const handleChangeGameLength = event => {
    setGameLength(event.target.value);
  };

  const handleSubmit = () => {
    console.log("User Name:", userName, ",", "Game Length:", gameLength);
  };

  return (
    <div>
      <div className="menuBorderContainer">
        <div className="inputFieldContainer">
          <input
            type="text"
            name="user_name"
            placeholder="Enter your name..."
            value={userName}
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
        <Link
          to={ROOM_ID}
          className="landingButton"
          onClick={() => handleSubmit()}
        >
          CREATE
        </Link>
        <button className="landingButton" onClick={() => setStage("initial")}>
          BACK
        </button>
      </div>
    </div>
  );
};

const JoinGameLanding = props => {
  const { setStage } = props;

  const [roomNumber, setRoomNumber] = useState("");
  const [userName, setUserName] = useState("");

  const handleChangeRoomNumber = event => {
    setRoomNumber(event.target.value);
  };

  const handleChangeUserName = event => {
    setUserName(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Room Number:", roomNumber, ",", "User Name:", userName);
  };

  return (
    <div>
      <div className="menuBorderContainer">
        <div className="inputFieldContainer">
          <input
            type="text"
            name="room_code"
            placeholder="Enter a room id..."
            value={roomNumber}
            onChange={handleChangeRoomNumber}
            className="inputField"
          />
          <input
            type="text"
            name="user_name"
            placeholder="Enter your name..."
            value={userName}
            onChange={handleChangeUserName}
            className="inputField"
          />
        </div>
        <Link
          to={ROOM_ID}
          className="landingButton"
          onClick={() => handleSubmit()}
        >
          JOIN
        </Link>
        <button className="landingButton" onClick={() => setStage("initial")}>
          BACK
        </button>
      </div>
    </div>
  );
};

const LandingStage = props => {
  const { stage, setStage } = props;

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
};

const Landing = () => {
  const [stage, setStage] = useState("initial");

  return (
    <div className="landingContainer">
      <div className="landingTitle">Welcome to WordBench</div>
      <LandingStage stage={stage} setStage={setStage} />
      <p className="aboutInfo">
        Let's put a touch more of the magic here. This is the way you take out
        your flustrations. Let's make some happy little clouds in our world.
        We'll take a little bit of Van Dyke Brown. Trees grow in all kinds of
        ways. They're not all perfectly straight. Not every limb is perfect.
        Everybody needs a friend. Steve wants reflections, so let's give him
        reflections.
      </p>
    </div>
  );
};

export default Landing;
