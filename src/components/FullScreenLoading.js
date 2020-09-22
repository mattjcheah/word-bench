import React from "react";
import styled from "styled-components";
import PulseLoader from "react-spinners/PulseLoader";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
`;

const FullScreenLoading = () => {
  return (
    <Container>
      <PulseLoader loading={true} size={"2rem"} color={"var(--blackboard)"} />
    </Container>
  );
};

export default FullScreenLoading;
