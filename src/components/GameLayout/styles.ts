import styled from "styled-components";

export const Container = styled.div`
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

export const Main = styled.div`
  grid-area: main;
  border: 1px solid var(--oxblood);
`;

export const Sidebar = styled.div`
  grid-area: sidebar;
  border: 1px solid var(--oxblood);
`;

export const Bottom = styled.div`
  grid-area: bottom;
  border: 1px solid var(--oxblood);
`;
