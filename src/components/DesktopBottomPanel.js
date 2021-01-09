import React, { useRef } from "react";
import styled from "styled-components";

import LetterBench from "./LetterBench";
import PlayerInput from "./PlayerInput";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 16rem;

  @media (min-width: 768px) {
    height: 12rem;
  }
`;

const LetterContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const DesktopBottomPanel = ({
  board,
  currentPlayer,
  shuffleLetters,
  completeWord,
}) => {
  const inputRef = useRef();

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
    <InputContainer>
      <LetterContainer>
        <LetterBench letters={board.letters} shuffleLetters={shuffleLetters} />
      </LetterContainer>
      <PlayerInput ref={inputRef} onSubmit={onSubmitWord} />
    </InputContainer>
  );
};

export default DesktopBottomPanel;
