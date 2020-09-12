import React from "react";

import Board from "./Board";
import LetterBench from "./LetterBench";
import PlayerInput from "./PlayerInput";
import OpponentList from "./OpponentList";

import "./stars.scss";
import "./bokeh.scss";

const GameBoard = ({
  currentPlayerId,
  roomId,
  players,
  board,
  completeWord,
  shuffleLetters,
}) => {
  const currentPlayer = players[currentPlayerId];

  const onSubmitWord = (word) => {
    return completeWord(
      roomId,
      board.words,
      currentPlayer.completedWords,
      word
    );
  };

  return (
    <div className="background">
      <div id="stars2" />
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>

      <div className="gameBoardContainer">
        <div className="leftSideMain">
          <div className="boardContainer">
            <Board
              board={board}
              completedWords={currentPlayer.completedWords}
            />
          </div>
          <div className="playerInputContainer">
            <LetterBench
              letters={board.letters}
              shuffleLetters={shuffleLetters}
            />
            <PlayerInput onSubmit={onSubmitWord} />
          </div>
        </div>
        <div className="rightSideMain">
          <div className="timerContainer">
            <p className="sideBarTitle">TIME REMAINING</p>
          </div>
          <div className="opponentsContainer">
            <p className="sideBarTitle">PLAYERS</p>
            <OpponentList
              currentPlayerId={currentPlayerId}
              players={players}
              totalNumberOfWords={board.words.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
