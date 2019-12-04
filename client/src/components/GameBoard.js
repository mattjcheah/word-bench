import React, { useState, useContext } from "react";
import Timer from "./Timer";

import { dummy_board_data } from "./Constants";

import { parseBoardPayload, generateBoardKey } from "./Helpers";

import ServerContext from "./ServerContext";

import "../components/stars.scss";
import "../components/bokeh.scss";

const Board = () => {
  const server = useContext(ServerContext);

  const board_width = dummy_board_data.board.width;
  const board_height = dummy_board_data.board.height;

  const col_cell_width = 100 / board_width;
  const row_cell_width = 100 / board_height;

  const col_class = (col_cell_width.toString() + "% ").repeat(board_width);
  const row_class = (row_cell_width.toString() + "% ").repeat(board_height);

  const boardRep = parseBoardPayload(dummy_board_data);

  console.log(boardRep);

  return (
    <div style={{ margin: "2% 15%", height: "92%" }}>
      <div
        style={{
          zIndex: "999",
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: col_class,
          gridTemplateRows: row_class
        }}
      >
        {Array(board_width)
          .fill(0)
          .map((x, indx) => {
            return Array(board_height)
              .fill(0)
              .map((y, indy) => {
                return boardRep[generateBoardKey(indx, indy)].content !==
                  "_" ? (
                  boardRep[generateBoardKey(indx, indy)].found ? (
                    <div className="boardTileOuter" key={(indx, indy)}>
                      <div className="boardTileInner">
                        {boardRep[
                          generateBoardKey(indx, indy)
                        ].content.toUpperCase()}
                      </div>
                    </div>
                  ) : (
                    <div className="boardTileOuterHidden" />
                  )
                ) : (
                  <div />
                );
              });
          })}
      </div>
    </div>
  );
};

const LetterBench = () => {
  const letters = dummy_board_data.board.letters;

  return (
    <div className="letterBench">
      <div style={{ display: "flex" }}>
        {letters.map((letter, ind) => {
          return (
            <div className="letterTileContainer" key={letter + ind}>
              <div className="letterTileInner">{letter}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const PlayerInput = () => {
  const [currentInput, setCurrentInput] = useState("");
  return (
    <div className="field" id="searchform">
      <input
        type="text"
        id="searchterm"
        placeholder="Enter a Word..."
        value={currentInput}
      />
      <button type="button" id="search">
        GO
      </button>
    </div>
  );
};

const OpponentList = props => {
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
};

const GameBoard = () => {
  const [opponents, setOpponents] = useState([
    { name: "Max", completion: "47" },
    { name: "Chatthew", completion: "82" },
    { name: "Julian", completion: "65" },
    { name: "Listerine Chew", completion: "21" },
    { name: "Justin Thyme", completion: "90" }
  ]);

  const minutes = 0;
  const seconds = 11;

  const gameEndTime = new Date();
  gameEndTime.setMinutes(gameEndTime.getMinutes() + minutes);
  gameEndTime.setSeconds(gameEndTime.getSeconds() + seconds);

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
            <Board />
          </div>
          <div className="playerInputContainer">
            <LetterBench />
            <PlayerInput />
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
