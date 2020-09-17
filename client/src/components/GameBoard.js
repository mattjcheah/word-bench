import React from "react";
import styled from "styled-components";

import Board from "./Board";
import LetterBench from "./LetterBench";
import PlayerInput from "./PlayerInput";
import PlayerList from "./PlayerList";
import ShuffleButton from "./ShuffleButton";
import GameLayout from "./GameLayout";

const BoardContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: linear-gradient(#1b2735, #233244);
  height: 100%;
`;

const TimerContainer = styled.div`
  height: 100%;
`;

const SidebarTitle = styled.div`
  margin: 10px;
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
    <GameLayout
      main={
        <BoardContainer>
          <Board
            board={room.board}
            completedWords={currentPlayer.completedWords}
          />
        </BoardContainer>
      }
      topSidebar={
        <TimerContainer>
          <SidebarTitle>TIME REMAINING</SidebarTitle>
        </TimerContainer>
      }
      sidebar={
        <>
          <SidebarTitle>PLAYERS</SidebarTitle>
          <PlayerList
            players={room.players}
            totalNumberOfWords={room.board.words.length}
          />
        </>
      }
      bottom={
        <InputContainer>
          <LetterContainer>
            <LetterBench
              letters={room.board.letters}
              shuffleLetters={shuffleLetters}
            />
            <ShuffleButton shuffleLetters={shuffleLetters} />
          </LetterContainer>
          <PlayerInput onSubmit={onSubmitWord} />
        </InputContainer>
      }
    />
  );
};

export default GameBoard;
