import { useState } from "react";
import Popup from "reactjs-popup";
import LandingButton from "../LandingButton";
import { Container, ModalContainer, ActionsContainer } from "./styles";

type Props = {
  giveUp: () => void;
};

const GiveUpSection = ({ giveUp }: Props) => {
  const [open, setOpen] = useState(false);

  const handleGiveUp = () => {
    setOpen(false);
    giveUp();
  };

  return (
    <Container>
      <Popup open={open} onClose={() => setOpen(false)} closeOnDocumentClick>
        <ModalContainer>
          <h2>Are you sure you want to give up?</h2>
          <p>Giving up will prevent guessing and show you all the words.</p>
          <ActionsContainer>
            <LandingButton onClick={handleGiveUp}>Yes</LandingButton>
            <LandingButton onClick={() => setOpen(false)}>No</LandingButton>
          </ActionsContainer>
        </ModalContainer>
      </Popup>
      <LandingButton onClick={() => setOpen(true)}>GIVE UP</LandingButton>
    </Container>
  );
};

export default GiveUpSection;
