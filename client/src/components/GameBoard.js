import React from "react";
import styled from "styled-components";

import Board from "./Board";
import LetterBench from "./LetterBench";
import PlayerInput from "./PlayerInput";
import OpponentList from "./OpponentList";
import ShuffleButton from "./ShuffleButton";

// import "./stars.scss";
// import "./bokeh.scss";

const LetterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const GameBoard = ({ currentPlayerId, room, completeWord, shuffleLetters }) => {
  const currentPlayer = room.players.find((p) => p.id === currentPlayerId);
  const onSubmitWord = (word) => {
    if (
      room.board.words.find((w) => w.word === word) &&
      !currentPlayer.completedWords.includes(word)
    ) {
      completeWord(currentPlayer, word);
      return true;
    }
    return false;
  };

  return (
    <div className="background">
      <div className="gameBoardContainer">
        <div className="leftSideMain">
          <div className="boardContainer">
            <Board
              board={room.board}
              completedWords={currentPlayer.completedWords}
            />
          </div>
          <div className="playerInputContainer">
            <LetterContainer>
              <LetterBench
                letters={room.board.letters}
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
              players={room.players}
              totalNumberOfWords={room.board.words.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
