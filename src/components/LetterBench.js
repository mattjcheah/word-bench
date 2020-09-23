import React from "react";
import styled from "styled-components";

import tileStyles from "./tileStyles";

const Container = styled.div`
  display: flex;
`;

const LetterTile = styled.div`
  ${tileStyles}
`;

const LetterBench = ({ letters }) => {
  return (
    <Container>
      {letters.map((letter, i) => {
        return (
          <LetterTile key={(letter, i)}>{letter.toUpperCase()}</LetterTile>
        );
      })}
    </Container>
  );
};

export default LetterBench;
