import fs from "fs";
import scrabble from "scrabble";

function generateWordSets() {
  const contents = fs.readFileSync(__dirname + "/5000-words.txt", "utf-8");
  const relevantWords = contents
    .split("\n")
    .filter((w) => w.length >= 3 && w.length <= 7);

  const relevantWordsSet = new Set(relevantWords);

  const sevenLetterWords = relevantWords.filter((w) => w.length === 7);

  const validWords = sevenLetterWords
    .map((word) =>
      scrabble(word)
        .filter((w) => relevantWordsSet.has(w))
        .sort((a, b) => b.length - a.length)
    )
    .filter((wordList) => wordList.length >= 5)
    .sort((a, b) => a.length - b.length);

  fs.writeFileSync(__dirname + "/wordsets.txt", validWords.join("\n"));
}

generateWordSets();
