import Popup from "reactjs-popup";
import LandingButton from "../LandingButton";
import { Container } from "./styles";

type Props = {
  open: boolean;
  closeModal: () => void;
  message: string;
};

const ErrorModal = ({ open, closeModal, message }: Props) => {
  return (
    <Popup modal open={open}>
      <Container>
        <p>{message}</p>
        <LandingButton onClick={closeModal}>OK</LandingButton>
      </Container>
    </Popup>
  );
};

export default ErrorModal;
