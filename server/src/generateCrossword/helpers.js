import fs from "fs";

// eslint-disable-next-line no-undef
const words = JSON.parse(fs.readFileSync(__dirname + "/wordlist.json"));
const baseWords = words.filter(word => word.length === 7);

export function getRandomBaseWord() {
  const index = Math.floor(Math.random() * (baseWords.length - 1));
  return baseWords[index];
}

export function getWords() {
  return words;
}
