import React, { useState } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import Board from "./Board";
import OpponentList from "./OpponentList";
import LandingButton from "./LandingButton";

const PopupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const LandingButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const CompletedGameBoard = ({
  currentPlayerId,
  room: { players, board },
  replayGame,
}) => {
  const [open, setOpen] = useState(true);

  const currentPlayer = players.find((p) => p.id === currentPlayerId);
  const isWinner = currentPlayer.completedWords.length === board.words.length;

  const { width, height } = useWindowSize();

  return (
    <div className="background">
      {isWinner && open && <Confetti width={width} height={height} />}
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
          <div className="playerInputContainer">
            <LandingButtonContainer>
              <LandingButton onClick={() => replayGame(currentPlayer.name)}>
                REPLAY
              </LandingButton>
            </LandingButtonContainer>
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

export default CompletedGameBoard;
