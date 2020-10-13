import React from "react";
import { animated, useSpring } from "react-spring";
import styled from "styled-components";

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

const getColours = (found, isComplete) => {
  if (found) {
    return {
      backgroundColor: "grain",
      color: "blackboard",
    };
  }

  if (isComplete) {
    return { backgroundColor: "oxblood", color: "grain" };
  }

  return { backgroundColor: "blueboard", color: "blackboard" };
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 2% 15%;
`;

const Crossword = styled.div`
  z-index: 999;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: ${(props) => props.colClass};
  grid-template-rows: ${(props) => props.rowClass};
`;

const Tile = styled(animated.div)`
  background-color: ${(props) => `var(--${props.backgroundColor})`};
  color: ${(props) => `var(--${props.color})`};
  margin: 2px;
  border-radius: 3px;
  font-size: calc(14px + 1vw);
  display: flex;
  align-items: center;
  justify-content: center;
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
  const boardWidth = board.width;
  const boardHeight = board.height;

  const col_cell_width = 100 / boardWidth;
  const row_cell_width = 100 / boardHeight;

  const colClass = (col_cell_width.toString() + "% ").repeat(boardWidth);
  const rowClass = (row_cell_width.toString() + "% ").repeat(boardHeight);

  const boardData = parseBoardData(board, completedWords);

  return (
    <Container>
      <Crossword colClass={colClass} rowClass={rowClass}>
        {boardData.map((row, i) =>
          row.map(({ content, found }, j) =>
            content === "_" ? (
              <div key={(i, j)} />
            ) : found ? (
              <FoundTile>{content.toUpperCase()}</FoundTile>
            ) : (
              <Tile key={(i, j)} {...getColours(found, isComplete)}>
                {isComplete && content.toUpperCase()}
              </Tile>
            )
          )
        )}
      </Crossword>
    </Container>
  );
};

export default Board;
