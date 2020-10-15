import React, { useState } from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";
import { gql } from "@apollo/client";

import client from "../graphql/apollo";

import LandingButton from "./LandingButton";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ActionsContainer = styled.div`
  display: flex;
`;

const GiveUpSection = ({ roomId }) => {
  const [open, setOpen] = useState(false);

  const giveUp = () => {
    setOpen(false);
    client.writeFragment({
      id: `Room:${roomId}`,
      fragment: gql`
        fragment CompletedBoard on Room {
          stage
        }
      `,
      data: {
        stage: "COMPLETE",
      },
    });
  };

  return (
    <Container>
      <Popup open={open} onClose={() => setOpen(false)} closeOnDocumentClick>
        <ModalContainer>
          <h2>Are you sure you want to give up?</h2>
          <p>Giving up will prevent guessing and show you all the words.</p>
          <ActionsContainer>
            <LandingButton onClick={() => giveUp()}>Yes</LandingButton>
            <LandingButton onClick={() => setOpen(false)}>No</LandingButton>
          </ActionsContainer>
        </ModalContainer>
      </Popup>
      <LandingButton onClick={() => setOpen(true)}>GIVE UP</LandingButton>
    </Container>
  );
};

export default GiveUpSection;
