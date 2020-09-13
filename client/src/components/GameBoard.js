import React from "react";
import styled from "styled-components";

import Board from "./Board";
import LetterBench from "./LetterBench";
import PlayerInput from "./PlayerInput";
import OpponentList from "./OpponentList";
import ShuffleButton from "./ShuffleButton";

import "./stars.scss";
import "./bokeh.scss";

const LetterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const GameBoard = ({
  currentPlayerId,
  roomId,
  players,
  board,
  completeWord,
  shuffleLetters,
}) => {
  const currentPlayer = players.find((p) => p.id === currentPlayerId);
  const onSubmitWord = (word) => {
    if (
      board.words.find((w) => w.word === word) &&
      !currentPlayer.completedWords.includes(word)
    ) {
      completeWord({ variables: { roomId, word } });
      return true;
    }
    return false;
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
            <LetterContainer>
              <LetterBench
                letters={board.letters}
                shuffleLetters={shuffleLetters}
              />
              <ShuffleButton shuffleLetters={shuffleLetters} />
            </LetterContainer>
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
