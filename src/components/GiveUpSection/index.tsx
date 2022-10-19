import { useState } from "react";
import Popup from "reactjs-popup";
import { gql } from "@apollo/client";
import { cache } from "../../graphql/apollo";
import LandingButton from "../LandingButton";
import { Container, ModalContainer, ActionsContainer } from "./styles";

type Props = {
  roomId: string;
};

const GiveUpSection = ({ roomId }: Props) => {
  const [open, setOpen] = useState(false);

  const giveUp = () => {
    setOpen(false);
    cache.writeFragment({
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
