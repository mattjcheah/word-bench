import React from "react";
import { animated, useSpring } from "react-spring";
import styled, { css } from "styled-components";

import useMedia from "./useMedia";

const parseBoardData = (boardData, completedWords) => {
  const result = initialiseBoard(boardData.height, boardData.width);

  boardData.words.forEach(addWordToBoard(completedWords, result));

  return result;
};

const initialiseBoard = (height, width) => {
  const result = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push({ content: "_", found: false });
    }
    result.push(row);
  }
  return result;
};

const addWordToBoard = (completedWords, result) => {
  return function ({ word, direction, startLocation }) {
    const found = completedWords.includes(word);
    word.split("").forEach((letter, index) => {
      const [row, col] = getIndexes(startLocation, index, direction);
      if (result[row][col].content === "_" || !result[row][col].found) {
        result[row][col] = { content: letter, found };
      }
    });
  };
};

const getIndexes = ({ rowNum, colNum }, currentIndex, direction) => {
  if (direction === "DOWN") {
    return [rowNum + currentIndex, colNum];
  }
  if (direction === "ACROSS") {
    return [rowNum, colNum + currentIndex];
  }
  throw new Error("Invalid direction");
};

const getColours = (found, isComplete, content) => {
  if (found) {
    return {
      background: "grain",
      color: "blackboard",
    };
  }

  if (content === "_") {
    return {
      background: "transparent",
      color: "transparent",
    };
  }

  if (isComplete) {
    return { background: "oxblood", color: "grain" };
  }

  return { background: "blueboard", color: "blackboard" };
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: auto;
`;

const Crossword = styled.div`
  padding: 0.5rem;

  display: grid;
  gap: 4px;
  ${({ rows, columns, size }) => css`
    grid-template-rows: repeat(${rows}, 1fr);
    grid-template-columns: repeat(${columns}, 1fr);
    width: ${size}px;
    height: ${size}px;
  `}
`;

const Tile = styled(animated.div)`
  background-color: ${(props) => `var(--${props.background})`};
  color: ${(props) => `var(--${props.color})`};
  border-radius: 3px;
  font-size: 1fr;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const FoundTile = ({ children }) => {
  const props = useSpring({
    backgroundColor: "#e5dad6",
    from: { backgroundColor: "green" },
    config: { duration: 300 },
  });
  return (
    <Tile {...getColours(true, false)} style={props}>
      {children}
    </Tile>
  );
};

const Board = ({ board, completedWords, isComplete }) => {
  const isSmallScreen = useMedia();
  const boardData = parseBoardData(board, completedWords);

  const { innerWidth: width, innerHeight: height } = window;

  const containerWidth = isSmallScreen ? width : width - 256;
  const containerHeight = height - 256;

  const minCellWidth = containerWidth / board.width;
  const minCellHeight = containerHeight / board.height;

  const size = minCellWidth < minCellHeight ? containerWidth : containerHeight;

  return (
    <Container>
      <Crossword rows={board.height} columns={board.width} size={size}>
        {boardData.map((row, i) =>
          row.map(({ content, found }, j) =>
            found ? (
              <FoundTile key={(i, j)}>{content.toUpperCase()}</FoundTile>
            ) : (
              <Tile key={(i, j)} {...getColours(false, isComplete, content)}>
                {isComplete && content !== "_" && content.toUpperCase()}
              </Tile>
            )
          )
        )}
      </Crossword>
    </Container>
  );
};

export default Board;
