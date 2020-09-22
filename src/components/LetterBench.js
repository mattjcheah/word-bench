import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const LetterTile = styled.div`
  background-color: lightgoldenrodyellow;
  height: 70px;
  width: 70px;
  font-size: 2.5rem;
  margin: 10px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const LetterBench = ({ letters }) => {
  return (
    <Container>
      {letters.map((letter, ind) => {
        return (
          <LetterTile key={letter + ind}>{letter.toUpperCase()}</LetterTile>
        );
      })}
    </Container>
  );
};

export default LetterBench;
