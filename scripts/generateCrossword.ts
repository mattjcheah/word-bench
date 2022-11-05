import cwg, { Crossword as RawCrossword } from "cwg";
import shuffle from "lodash/shuffle";
import { tryCatch, Option } from "fp-ts/Option";
import { pipe } from "fp-ts/function";
import { WordSet } from "./generateWordSet";

type Word = {
  word: string;
  startLocation: { rowNum: number; colNum: number };
  direction: "ACROSS" | "DOWN";
};

export type Crossword = {
  baseWord: string;
  height: number;
  width: number;
  letters: string[];
  words: Word[];
  bonusWords: string[];
};

const formatCrossword =
  (wordSet: WordSet) =>
  ({ height, width, positionObjArr: words }: RawCrossword): Crossword => {
    return {
      baseWord: wordSet.baseWord,
      height,
      width,
      letters: shuffle(wordSet.baseWord.split("")),
      words: words.map(({ wordStr, xNum, yNum, isHorizon }) => ({
        word: wordStr,
        startLocation: { rowNum: yNum, colNum: xNum },
        direction: isHorizon ? "ACROSS" : "DOWN",
      })),
      bonusWords: wordSet.bonusWords,
    };
  };

const generateCrossword = (wordSet: WordSet): Option<Crossword> => {
  return tryCatch(() =>
    pipe(wordSet.relevantWords, cwg, formatCrossword(wordSet))
  );
};

export default generateCrossword;
