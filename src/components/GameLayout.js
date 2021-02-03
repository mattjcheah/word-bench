import React, { useState } from "react";
import styled from "styled-components";

import useMedia from "./useMedia";
import SlidingSidebar from "./SlidingSidebar";

const Container = styled.div`
  box-sizing: border-box;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
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
  height: 100vh;
  background-color: var(--grain);
  border-left: 1px solid var(--oxblood);
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
  width: 16rem;
`;

const GameLayout = ({ main, sidebar, bottom }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const isSmallScreen = useMedia();

  return (
    <Container>
      <Left>
        <Main>{main}</Main>
        <Bottom>{bottom}</Bottom>
      </Left>
      {isSmallScreen ? (
        <SlidingSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
          <Right>{sidebar}</Right>
        </SlidingSidebar>
      ) : (
        <Right>{sidebar}</Right>
      )}
    </Container>
  );
};

export default GameLayout;
