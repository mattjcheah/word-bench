import { differenceInSeconds } from "date-fns";
import { pipe, flow } from "fp-ts/function";
import { filterMap } from "fp-ts/Array";
import generateCrossword from "./generateCrossword";
import generateWordSet from "./generateWordSet";
import { readWordList, writeFile } from "./utils";

const generateWords = () => {
  const start = new Date();

  const relevantWordsList = readWordList("relevantWords.txt");
  const relevantWordsSet = new Set(relevantWordsList);

  const bonusWordsList = readWordList("bonusWords.txt");
  const bonusWordsSet = new Set(bonusWordsList);

  const sevenLetterWords = relevantWordsList.filter((w) => w.length === 7);

  const crosswords = pipe(
    sevenLetterWords,
    filterMap(
      flow(generateWordSet(relevantWordsSet, bonusWordsSet), generateCrossword)
    )
  );

  writeFile("./output/crosswords.json", JSON.stringify(crosswords));

  const end = new Date();

  console.log("Elapsed:", differenceInSeconds(end, start));

  console.log(`# Crosswords: ${crosswords.length}`);
};

generateWords();
