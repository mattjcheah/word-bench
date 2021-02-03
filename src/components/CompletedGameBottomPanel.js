import React from "react";
import styled from "styled-components";

import LandingButton from "./LandingButton";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16rem;

  @media (min-width: 768px) {
    height: 12rem;
  }
`;

const CompletedGameBottomPanel = ({ currentPlayer, replayGame }) => (
  <Container>
    <LandingButton onClick={() => replayGame(currentPlayer.name)}>
      REPLAY
    </LandingButton>
  </Container>
);

export default CompletedGameBottomPanel;
