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

const getColours = (found, isComplete, content) => {
  if (found) {
    return {
      background: "grain",
      color: "blackboard",
    };
  }

  if (content === "_") {
    return {
      backgroundColor: "transparent",
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
`;

const Crossword = styled.div`
  width: 70%;
  height: 95%;

  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  flex: 1;
`;

const Tile = styled(animated.div)`
  background-color: ${(props) => `var(--${props.background})`};
  color: ${(props) => `var(--${props.color})`};
  margin: 2px;
  border-radius: 3px;
  font-size: calc(14px + 1vw);
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
  const boardData = parseBoardData(board, completedWords);

  return (
    <Container>
      <Crossword>
        {boardData.map((row, i) => (
          <Row key={i}>
            {row.map(({ content, found }, j) =>
              found ? (
                <FoundTile key={(i, j)}>{content.toUpperCase()}</FoundTile>
              ) : (
                <Tile key={(i, j)} {...getColours(false, isComplete, content)}>
                  {isComplete && content !== "_" && content.toUpperCase()}
                </Tile>
              )
            )}
          </Row>
        ))}
      </Crossword>
    </Container>
  );
};

export default Board;
