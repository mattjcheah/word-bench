import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2% 15%;
`;

export const Crossword = styled.div<{ colClass: string; rowClass: string }>`
  z-index: 999;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${(props) => props.colClass};
  grid-template-rows: ${(props) => props.rowClass};
`;

export const Tile = styled.div<{ background: string; color: string }>`
  background-color: ${(props) => `var(--${props.background})`};
  color: ${(props) => `var(--${props.color})`};
  margin: 2px;
  border-radius: 3px;
  font-size: calc(14px + 1vw);
  display: flex;
  align-items: center;
  justify-content: center;
`;
