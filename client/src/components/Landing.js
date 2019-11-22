import React, { useState } from "react";
import "../styles.css";

const InitialLanding = props => {
  const { setStage } = props;
  return (
    <div>
      <div className="initButtonContainer">
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
  return (
    <div>
      <div className="initButtonContainer">
        <button className="landingButton">CREATE</button>
        <button className="landingButton" onClick={() => setStage("initial")}>
          BACK
        </button>
      </div>
    </div>
  );
};

const JoinGameLanding = props => {
  const { setStage } = props;
  return (
    <div>
      <div className="initButtonContainer">
        <button className="landingButton">JOIN</button>
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
