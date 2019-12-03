import React, { useState } from "react";
import Timer from "./Timer";

import { dummy_board_data } from "./Constants";

import { parseBoardPayload } from "./Helpers";

import "../components/stars.scss";
import "../components/bokeh.scss";

const Board = () => {
  const board_width = dummy_board_data.board.width;
  const board_height = dummy_board_data.board.height;

  const col_class = "4vw ".repeat(board_width);
  const row_class = "4vw ".repeat(board_height);

  const scaled_width = 4 * dummy_board_data.board.width;
  const scaled_height = 4 * dummy_board_data.board.height;

  parseBoardPayload(dummy_board_data);

  return (
    <div
      style={{
        zIndex: "999",
        width: scaled_width,
        height: scaled_height,
        // backgroundColor: "lightgrey",
        // margin: "0 auto",
        // position: "relative",
        // top: "50%",
        // transform: "translateY(-50%)",
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
              return (
                <div
                  style={{
                    backgroundColor: "#e5dad6",
                    // border: "1px solid grey"
                    margin: "2px",
                    borderRadius: "3px"
                  }}
                  key={(indx, indy)}
                >
                  <div
                    style={{
                      textAlign: "center",
                      position: "relative",
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontSize: "calc(10px + 1vw)"
                    }}
                  >
                    A
                  </div>
                </div>
              );
            });
        })}
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
        {/* 
        <div className="letterTileContainer">
          <div className="letterTileInner">A</div>
        </div>
        <div className="letterTileContainer">
          <div className="letterTileInner">A</div>
        </div>
        <div className="letterTileContainer">
          <div className="letterTileInner">A</div>
        </div>
        <div className="letterTileContainer">
          <div className="letterTileInner">A</div>
        </div>
        <div className="letterTileContainer">
          <div className="letterTileInner">A</div>
        </div>
        <div className="letterTileContainer">
          <div className="letterTileInner">A</div>
        </div> */}
      </div>
    </div>
  );
};

const PlayerInput = () => {
  return (
    <div className="field" id="searchform">
      <input type="text" id="searchterm" placeholder="Enter a Word..." />
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
    { name: "Matt", completion: "82" },
    { name: "Julian", completion: "65" },
    { name: "Name", completion: "21" },
    { name: "Jeff", completion: "90" }
  ]);

  const minutes = 0;
  const seconds = 11;

  const gameEndTime = new Date();
  gameEndTime.setMinutes(gameEndTime.getMinutes() + minutes);
  gameEndTime.setSeconds(gameEndTime.getSeconds() + seconds);

  return (
    <div className="background">
      <div id="stars2" />

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
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default GameBoard;
