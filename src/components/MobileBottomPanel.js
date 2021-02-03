import React, { useState } from "react";
import styled from "styled-components";
import LetterBench from "./LetterBench";
import tileStyles from "./tileStyles";
import { FiDelete } from "react-icons/fi";

const InputContainer = styled.div`
  height: 16rem;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

const InputDisplayContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
`;

const InputDisplay = styled.div`
  flex: 1;
  margin: 0.5rem;
  padding: 0 0.5rem;
  font-size: 2.5rem;
  border: 4px solid var(--oxblood);
`;

const DeleteButton = styled.button`
  ${tileStyles}
`;

const MobileBottomPanel = ({
  board,
  currentPlayer,
  shuffleLetters,
  completeWord,
}) => {
  const [input, setInput] = useState("");

  const handleLetterClick = (letter) => {
    const guessedWord = `${input}${letter}`;

    if (
      board.words.find((w) => w.word === guessedWord) &&
      !currentPlayer.completedWords.includes(guessedWord)
    ) {
      completeWord(currentPlayer, guessedWord);
      setInput("");
    } else {
      setInput(guessedWord);
    }
  };

  return (
    <InputContainer>
      <InputDisplayContainer>
        <InputDisplay>{input}</InputDisplay>
        <DeleteButton onClick={() => setInput("")}>
          <FiDelete>Delete</FiDelete>
        </DeleteButton>
      </InputDisplayContainer>
      <LetterBench
        letters={board.letters}
        shuffleLetters={shuffleLetters}
        onClick={handleLetterClick}
      />
    </InputContainer>
  );
};

export default MobileBottomPanel;
