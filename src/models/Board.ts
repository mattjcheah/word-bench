export type Word = {
  word: string;
  startLocation: {
    rowNum: number;
    colNum: number;
  };
  direction: "DOWN" | "ACROSS";
};

export type Board = {
  height: number;
  width: number;
  letters: string[];
  words: Word[];
};
