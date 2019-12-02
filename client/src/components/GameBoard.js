import React, { useState } from "react";
import "../styles.scss";

const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const cols = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

const dict = {
  "1,1": "A",
  "1,2": "B"
};

const BoardSquare = () => {
  return (
    <div
      style={{
        height: "2vw",
        width: "2vw",
        border: "1px solid grey",
        display: "inline-block"
      }}
    />
  );
};

const Row = () => {
  return (
    <div>
      {liss.map(l => {
        return <BoardSquare />;
      })}
    </div>
  );
};

const Board = () => {
  return (
    <div
      style={{
        width: "48vw",
        height: "36vw",
        backgroundColor: "lightgrey",
        margin: "0 auto",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
        display: "grid",
        gridTemplateColumns:
          "3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw",
        gridTemplateRows: "3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw 3vw"
      }}
    >
      {cols.map(x => {
        return rows.map(y => {
          return (
            <div
              style={{ backgroundColor: "lightgrey", border: "1px solid grey" }}
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
    // </div>
  );
};

const LetterBench = () => {
  return (
    <div className="letterBench">
      <div style={{ display: "flex" }}>
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
      </div>
    </div>
  );
};

const PlayerInput = () => {
  return (
    <div class="field" id="searchform">
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
    <ul class="skill-list">
      {opponents.map((opponent, ind) => {
        const colourIndex = (ind % 4) + 1;
        const colourClass = "skill-" + colourIndex;
        return (
          <li class="skill">
            <h3>{opponent.name}</h3>
            <progress
              class={colourClass}
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

  return (
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
          <p className="timer">3:19</p>
        </div>
        <div className="opponentsContainer">
          <p className="sideBarTitle">PLAYERS</p>
          <OpponentList opponents={opponents} />
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
