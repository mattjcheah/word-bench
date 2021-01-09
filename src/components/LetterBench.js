import React from "react";
import styled from "styled-components";
import ShuffleButton from "./ShuffleButton";

import tileStyles from "./tileStyles";

const Container = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr 1fr 1fr;
`;

const LetterTile = styled.button`
  ${tileStyles}
`;

const LetterBench = ({ letters, shuffleLetters, inputRef, onClick }) => {
  return (
    <Container>
      {letters.map((letter, i) => {
        return (
          <LetterTile key={(letter, i)} onClick={() => onClick(letter)}>
            {letter.toUpperCase()}
          </LetterTile>
        );
      })}
      <ShuffleButton
        onClick={() => {
          shuffleLetters();
          inputRef.current.focus();
        }}
      />
    </Container>
  );
};

export default LetterBench;
