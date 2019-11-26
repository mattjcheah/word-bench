import React from "react";
import "../styles.css";

const LetterBench = () => {
  return <div className="letterBench">letter bench</div>;
};

const PlayerInput = () => {
  return <div className="playerInput">player input</div>;
};

const OpponentList = props => {
  const { opponents } = props;

  return (
    <div className="opponentList">
      {opponents.map(opponent => {
        return <div>{opponent}</div>;
      })}
    </div>
  );
};

const GameBoard = () => {
  return (
    <div className="gameBoardContainer">
      <div className="leftSideMain">
        <div className="boardContainer">gameboard</div>
        <div className="playerInputContainer">
          <LetterBench />
          <PlayerInput />
        </div>
      </div>
      <div className="rightSideMain">
        <div className="timerContainer">
          <p className="sideBarTitle">TIME REMAINING</p>
          <p className="timer">3:19</p>
        </div>
        <div className="opponentsContainer">
          <p className="sideBarTitle">PLAYERS</p>
          <OpponentList opponents={["player1", "player2", "player3"]} />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
