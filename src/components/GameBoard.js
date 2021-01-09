import React, { useState } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import Board from "./Board";
import LetterBench from "./LetterBench";
import PlayerInput from "./PlayerInput";
import PlayerList from "./PlayerList";
import ShuffleButton from "./ShuffleButton";
import GameLayout from "./GameLayout";
import LandingButton from "./LandingButton";
import GiveUpSection from "./GiveUpSection";

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

const InputContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LetterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const LandingButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

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

  const onSubmitWord = (word) => {
    const lowerCaseWord = word.toLowerCase();
    if (
      board.words.find((w) => w.word === lowerCaseWord) &&
      !currentPlayer.completedWords.includes(lowerCaseWord)
    ) {
      completeWord(currentPlayer, lowerCaseWord);
      return true;
    }
    return false;
  };

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
            <LandingButtonContainer>
              <LandingButton onClick={() => replayGame(currentPlayer.name)}>
                REPLAY
              </LandingButton>
            </LandingButtonContainer>
          ) : (
            <InputContainer>
              <LetterContainer>
                <LetterBench
                  letters={board.letters}
                  shuffleLetters={shuffleLetters}
                />
                <ShuffleButton shuffleLetters={shuffleLetters} />
              </LetterContainer>
              <PlayerInput onSubmit={onSubmitWord} />
            </InputContainer>
          )
        }
      />
    </>
  );
};

export default GameBoard;
