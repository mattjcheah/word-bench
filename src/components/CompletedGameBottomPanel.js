import React from "react";
import styled from "styled-components";

import LandingButton from "./LandingButton";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const CompletedGameBottomPanel = ({ currentPlayer, replayGame }) => (
  <Container>
    <LandingButton onClick={() => replayGame(currentPlayer.name)}>
      REPLAY
    </LandingButton>
  </Container>
);

export default CompletedGameBottomPanel;
