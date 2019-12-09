import scrabble from "scrabble";
import { getRandomBaseWord, getWords } from "./helpers";

function generateWordSet() {
  const scrabbleWords = scrabble(getRandomBaseWord());
  const wordSet = scrabbleWords
    .filter(isValidWord)
    .sort((a, b) => b.length - a.length);
  return wordSet.length >= 7 ? [...new Set(wordSet)] : generateWordSet();
}

function isValidWord(word) {
  return getWords().includes(word);
}

export default generateWordSet;
