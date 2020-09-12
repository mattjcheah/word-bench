import React, { useState, useContext } from "react";
import Timer from "./Timer";

import { generateOpponents } from "./Helpers";

import ServerContext from "./ServerContext";

import "../components/stars.scss";
import "../components/bokeh.scss";

import Board from "../components/Board";
import ShuffleButton from "./ShuffleButton";

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

function LetterBench({ letters, shuffleLetters }) {
  return (
    <div className="letterBench">
      <div style={{ display: "flex" }}>
        {letters.map((letter, ind) => {
          return (
            <div className="letterTileContainer" key={letter + ind}>
              <div className="letterTileInner">{letter.toUpperCase()}</div>
            </div>
          );
        })}
        <ShuffleButton shuffleLetters={shuffleLetters} />
      </div>
    </div>
  );
}

function PlayerInput({ onSubmit }) {
  const [currentInput, setCurrentInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidWord = onSubmit(currentInput);
    if (isValidWord) {
      setCurrentInput("");
    }
  };

  return (
    <form className="field" onSubmit={handleSubmit}>
      <input
        type="text"
        id="searchterm"
        placeholder="Enter a Word..."
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        autoComplete="off"
      />
      <button type="submit">GO</button>
    </form>
  );
}

function OpponentList(props) {
  const { opponents } = props;
  opponents.sort((a, b) => (a.completion < b.completion ? 1 : -1));

  return (
    <ul className="skill-list">
      {opponents.map((opponent, ind) => {
        const colourIndex = (ind % 4) + 1;
        const colourClass = "skill-" + colourIndex;
        return (
          <li className="skill" key={opponent + ind}>
            <h3>{opponent.name}</h3>
            <progress
              className={colourClass}
              max="100"
              value={opponent.completion}
            />
          </li>
        );
      })}
    </ul>
  );
}

export default GameBoard;
