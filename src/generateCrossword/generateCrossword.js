import cwg from "cwg";
import _ from "lodash";
import generateWordSet from "./generateWordSet";

function crosswordGenerator() {
  const wordSet = generateWordSet();

  return formatCrossword(wordSet[0].split(""), cwg(wordSet));
}

function formatCrossword(letters, generatedCrossword) {
  const { height, width, positionObjArr: words } = generatedCrossword;
  return {
    height,
    width,
    letters: _.shuffle(letters),
    words: words.map(({ wordStr, xNum, yNum, isHorizon }) => ({
      word: wordStr,
      startLocation: [yNum, xNum],
      direction: isHorizon ? "ACROSS" : "DOWN"
    }))
  };
}

export default crosswordGenerator;
