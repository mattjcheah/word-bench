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
  width: 25vw;
`;

const Main = styled.div`
  border: 1px solid var(--oxblood);
  flex: 1;
`;

const Bottom = styled.div`
  border: 1px solid var(--oxblood);
  height: 25vh;
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
