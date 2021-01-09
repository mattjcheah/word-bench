import React, { useState } from "react";
import styled from "styled-components";
import useWindowSize from "react-use/lib/useWindowSize";

import SlidingSidebar from "./SlidingSidebar";

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
  height: 100vh;
  background-color: var(--grain);
  border-left: 1px solid var(--oxblood);

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
  width: 16rem;
`;

const GameLayout = ({ main, sidebar, bottom }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowSize();

  return (
    <Container>
      <Left>
        <Main>{main}</Main>
        <Bottom>{bottom}</Bottom>
      </Left>
      {width >= 768 ? (
        <Right>
          <Sidebar>{sidebar}</Sidebar>
        </Right>
      ) : (
        <SlidingSidebar isOpen={menuOpen} onClose={() => setMenuOpen(false)}>
          <Right>
            <Sidebar>{sidebar}</Sidebar>
          </Right>
        </SlidingSidebar>
      )}
    </Container>
  );
};

export default GameLayout;
