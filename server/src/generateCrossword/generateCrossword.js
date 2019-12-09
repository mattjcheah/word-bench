import cwg from "cwg";
import generateWordSet from "./generateWordSet";

function crosswordGenerator() {
  const wordSet = generateWordSet();

  const crossword = formatCrossword(wordSet[0].split(""), cwg(wordSet));
  return crossword;
}

function formatCrossword(letters, generatedCrossword) {
  const { height, width, positionObjArr: words } = generatedCrossword;
  return {
    height,
    width,
    letters,
    words: words.map(({ wordStr, xNum, yNum, isHorizon }) => ({
      word: wordStr,
      startLocation: [xNum, yNum],
      direction: isHorizon ? "ACROSS" : "DOWN"
    }))
  };
}

export default crosswordGenerator;
