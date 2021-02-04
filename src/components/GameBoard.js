import React, { useState } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import Board from "./Board";
import PlayerList from "./PlayerList";
import GameLayout from "./GameLayout";
import GiveUpSection from "./GiveUpSection";
import MobileBottomPanel from "./MobileBottomPanel";
import DesktopBottomPanel from "./DesktopBottomPanel";
import CompletedGameBottomPanel from "./CompletedGameBottomPanel";

const PopupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const BoardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(#1b2735, #233244);
  height: 100%;
`;

const SidebarContainer = styled.div`
  height: 100%;
  overflow-y: auto;
`;

const SidebarTitle = styled.h2`
  margin: 1rem;
  font-size: 1.25rem;
  font-weight: 900;
`;

const isTouchDevice = () => "ontouchstart" in window;

const GameBoard = ({
  currentPlayerId,
  room: { id, stage, players, board },
  completeWord,
  shuffleLetters,
  replayGame,
}) => {
  const isComplete = stage === "COMPLETE";
  const [open, setOpen] = useState(true);

  const currentPlayer = players.find((p) => p.id === currentPlayerId);
  const isWinner = currentPlayer.completedWords.length === board.words.length;

  const { width, height } = useWindowSize();

  return (
    <>
      {isComplete && isWinner && open && (
        <Confetti width={width} height={height} />
      )}
      {isComplete && (
        <Popup open={open} onClose={() => setOpen(false)} closeOnDocumentClick>
          <PopupContainer>{isWinner ? "You Win!" : "You Lose!"}</PopupContainer>
        </Popup>
      )}
      <GameLayout
        main={
          <BoardContainer>
            <Board
              board={board}
              completedWords={currentPlayer.completedWords}
              isComplete={isComplete}
              width={width}
              height={height}
            />
          </BoardContainer>
        }
        sidebar={
          <SidebarContainer>
            {isComplete || <GiveUpSection roomId={id} />}
            <SidebarTitle>PLAYERS</SidebarTitle>
            <PlayerList
              players={players}
              totalNumberOfWords={board.words.length}
            />
          </SidebarContainer>
        }
        bottom={
          isComplete ? (
            <CompletedGameBottomPanel
              currentPlayer={currentPlayer}
              replayGame={replayGame}
            />
          ) : isTouchDevice() ? (
            <MobileBottomPanel
              board={board}
              currentPlayer={currentPlayer}
              shuffleLetters={shuffleLetters}
              completeWord={completeWord}
            />
          ) : (
            <DesktopBottomPanel
              board={board}
              currentPlayer={currentPlayer}
              shuffleLetters={shuffleLetters}
              completeWord={completeWord}
            />
          )
        }
      />
    </>
  );
};

export default GameBoard;
