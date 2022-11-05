import { readWordList, writeFile } from "./utils";

const addNewWords = (newWords: string[]) => {
  const words = readWordList("relevantWords.txt");
  const newWordsSet = new Set([...words, ...newWords]);
  const allWords = Array.from(newWordsSet).sort();
  writeFile("./input/relevantWords.txt", allWords.join("\n"));
};

addNewWords([]);
