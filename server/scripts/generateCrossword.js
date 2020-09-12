import fs from "fs";
import cwg from "cwg";
import _ from "lodash";

function hasCrossword(wordSet) {
  return !!cwg(wordSet);
}

function generateCrossword(wordSet) {
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
      direction: isHorizon ? "ACROSS" : "DOWN",
    })),
  };
}

function generateCrosswords() {
  const contents = fs.readFileSync(__dirname + "/wordsets.txt", "utf-8");
  const wordSets = contents.split("\n").map((set) => set.split(","));
  const crosswords = wordSets
    .filter(hasCrossword)
    .map((set) => generateCrossword(set));
  fs.writeFileSync(
    __dirname + "/output/crosswords.json",
    JSON.stringify(crosswords, undefined, 2)
  );
}

generateCrosswords();
