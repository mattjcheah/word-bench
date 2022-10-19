import { animated, useSpring } from "react-spring";
import { Board, Word } from "../../models/Board";
import { Container, Crossword, Tile } from "./styles";

type CellContents = { content: string; found: boolean };

type Grid = CellContents[][];

const parseBoardData = (boardData: Board, completedWords: string[]): Grid => {
  const result = initialiseBoard(boardData.height, boardData.width);
  boardData.words.forEach(addWordToBoard(completedWords, result));
  return result;
};

const initialiseBoard = (height: number, width: number): Grid => {
  let result: CellContents[][] = [];
  for (let i = 0; i < height; i++) {
    let row: CellContents[] = [];
    for (let j = 0; j < width; j++) {
      row.push({ content: "_", found: false });
    }
    result.push(row);
  }
  return result;
};

const addWordToBoard =
  (completedWords: string[], result: Grid) => (wordObj: Word) => {
    const { word } = wordObj;
    const found = completedWords.includes(word);
    word.split("").forEach((letter, index) => {
      const [row, col] = getIndexes(index, wordObj);
      if (result[row][col].content === "_" || !result[row][col].found) {
        result[row][col] = { content: letter, found };
      }
    });
  };

const getIndexes = (
  currentIndex: number,
  { direction, startLocation: { rowNum, colNum } }: Word
): number[] => {
  if (direction === "DOWN") {
    return [rowNum + currentIndex, colNum];
  }

  return [rowNum, colNum + currentIndex];
};

const getColours = (
  found: boolean,
  isComplete: boolean
): { background: string; color: string } => {
  if (found) {
    return {
      background: "grain",
      color: "blackboard",
    };
  }

  if (isComplete) {
    return { background: "oxblood", color: "grain" };
  }

  return { background: "blueboard", color: "blackboard" };
};

const FoundTile = ({ children }: { children: string }) => {
  const props = useSpring({
    backgroundColor: "#e5dad6",
    from: { backgroundColor: "green" },
    config: { duration: 300 },
  });

  return (
    <Tile as={animated.div} {...getColours(true, false)} style={props}>
      {children}
    </Tile>
  );
};

type Props = {
  board: Board;
  completedWords: string[];
  isComplete: boolean;
};

const Board = ({ board, completedWords, isComplete }: Props) => {
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
              <div key={`${i}, ${j}`} />
            ) : found ? (
              <FoundTile key={`${i}, ${j}`}>{content.toUpperCase()}</FoundTile>
            ) : (
              <Tile key={`${i}, ${j}`} {...getColours(found, isComplete)}>
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
