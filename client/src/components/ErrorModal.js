import React from "react";
import styled from "styled-components";
import Popup from "reactjs-popup";

import LandingButton from "./LandingButton";

const Container = styled.div`
  width: 50vw;
  padding: 20px;
  box-sizing: border-box;
`;

const ErrorModal = ({ open, closeModal, message }) => {
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
