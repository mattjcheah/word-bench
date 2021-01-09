import React from "react";
import styled from "styled-components";

const Container = styled.div`
  box-sizing: border-box;
  height: 100vh;

  display: flex;
`;

const Vertical = styled.div`
  display: flex;
  flex-direction: column;
`;

const Left = styled(Vertical)`
  flex: 1;
`;

const Right = styled(Vertical)`
  width: 16rem;
  display: none;

  @media (min-width: 768px) {
    display: inherit;
  }
`;

const Main = styled.div`
  flex: 1;
`;

const Bottom = styled.div`
  border-top: 1px solid var(--oxblood);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Sidebar = styled.div`
  border: 1px solid var(--oxblood);
  flex: 1;
`;

const GameLayout = ({ main, sidebar, bottom }) => {
  return (
    <Container>
      <Left>
        <Main>{main}</Main>
        <Bottom>{bottom}</Bottom>
      </Left>
      <Right>
        <Sidebar>{sidebar}</Sidebar>
      </Right>
    </Container>
  );
};

export default GameLayout;
