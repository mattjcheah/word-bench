import React from "react";
import styled from "styled-components";
import Head from "./Head";

const Container = styled.div`
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 25vw;
  grid-template-rows: 25vh 1fr 25vh;
  height: 100vh;

  grid-template-areas:
    "main sidebar"
    "main sidebar"
    "bottom sidebar";
`;

const Main = styled.div`
  grid-area: main;
  border: 1px solid var(--oxblood);
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  border: 1px solid var(--oxblood);
`;

const Bottom = styled.div`
  grid-area: bottom;
  border: 1px solid var(--oxblood);
`;

const GameLayout = ({ main, sidebar, bottom }) => {
  return (
    <Container>
      <Head />
      <Main>{main}</Main>
      <Sidebar>{sidebar}</Sidebar>
      <Bottom>{bottom}</Bottom>
    </Container>
  );
};

export default GameLayout;
