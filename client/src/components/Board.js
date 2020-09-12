import React from "react";

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

const getIndexes = ([startRow, startCol], currentIndex, direction) => {
  if (direction === "DOWN") {
    return [startRow + currentIndex, startCol];
  }
  if (direction === "ACROSS") {
    return [startRow, startCol + currentIndex];
  }
  throw new Error("Invalid direction");
};

const Board = ({ board, completedWords }) => {
  const boardWidth = board.width;
  const boardHeight = board.height;

  const col_cell_width = 100 / boardWidth;
  const row_cell_width = 100 / boardHeight;

  const col_class = (col_cell_width.toString() + "% ").repeat(boardWidth);
  const row_class = (row_cell_width.toString() + "% ").repeat(boardHeight);

  const boardData = parseBoardData(board, completedWords);

  return (
    <div style={{ margin: "2% 15%", height: "92%" }}>
      <div
        style={{
          zIndex: "999",
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: col_class,
          gridTemplateRows: row_class,
        }}
      >
        {boardData.map((row, i) =>
          row.map(({ content, found }, j) =>
            content === "_" ? (
              <div key={(i, j)} />
            ) : found ? (
              <div className="boardTileOuter" key={(i, j)}>
                <div className="boardTileInner">{content.toUpperCase()}</div>
              </div>
            ) : (
              <div className="boardTileOuterHidden" key={(i, j)} />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Board;
