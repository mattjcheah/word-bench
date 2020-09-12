import React, { useContext } from "react";
import Timer from "./Timer";

import { generateOpponents } from "./Helpers";

import ServerContext from "./ServerContext";

import "./stars.scss";
import "./bokeh.scss";

import Board from "./Board";
import LetterBench from "./LetterBench";
import PlayerInput from "./PlayerInput";
import OpponentList from "./OpponentList";

const GameBoard = () => {
  const server = useContext(ServerContext);

  const player = server.players[server.socket.socket.id];

  const opponents = generateOpponents(
    server.id,
    server.players,
    server.board.words.length
  );

  const minutes = 0;
  const seconds = 11;

  const gameEndTime = new Date();
  gameEndTime.setMinutes(gameEndTime.getMinutes() + minutes);
  gameEndTime.setSeconds(gameEndTime.getSeconds() + seconds);

  const onSubmitWord = (word) => {
    return server.socket.completeWord(server, player.completedWords, word);
  };

  const shuffleLetters = () => {
    server.socket.shuffleLetters(server.board.letters);
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
              board={server.board}
              completedWords={player.completedWords}
            />
          </div>
          <div className="playerInputContainer">
            <LetterBench
              letters={server.board.letters}
              shuffleLetters={shuffleLetters}
            />
            <PlayerInput onSubmit={onSubmitWord} />
          </div>
        </div>
        <div className="rightSideMain">
          <div className="timerContainer">
            <p className="sideBarTitle">TIME REMAINING</p>
            <Timer gameEndTime={gameEndTime} />
          </div>
          <div className="opponentsContainer">
            <p className="sideBarTitle">PLAYERS</p>
            <OpponentList opponents={opponents} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
