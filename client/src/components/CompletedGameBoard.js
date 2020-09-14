import React, { useState } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";

import Board from "./Board";
import OpponentList from "./OpponentList";

// import "./stars.scss";
// import "./bokeh.scss";

const PopupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const CompletedGameBoard = ({ currentPlayerId, players, board }) => {
  const [open, setOpen] = useState(true);

  const currentPlayer = players.find((p) => p.id === currentPlayerId);
  const isWinner = currentPlayer.completedWords.length === board.words.length;

  return (
    <div className="background">
      <Popup open={open} onClose={() => setOpen(false)} closeOnDocumentClick>
        <PopupContainer>{isWinner ? "You Win!" : "You Lose!"}</PopupContainer>
      </Popup>
      <div className="gameBoardContainer">
        <div className="leftSideMain">
          <div className="boardContainer">
            <Board
              board={board}
              completedWords={currentPlayer.completedWords}
              isComplete={true}
            />
          </div>
          <div className="playerInputContainer"></div>
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

export default CompletedGameBoard;
