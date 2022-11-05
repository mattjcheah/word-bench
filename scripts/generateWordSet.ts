import { Permutation } from "js-combinatorics";

export type WordSet = {
  baseWord: string;
  relevantWords: string[];
  bonusWords: string[];
};

const getPermutations = (word: string, length: number) => {
  return new Permutation(word, length).toArray().map((w) => w.join(""));
};

const generateWordSet =
  (relevantWordsSet: Set<string>, bonusWordsSet: Set<string>) =>
  (baseWord: string): WordSet => {
    const words = [3, 4, 5, 6, 7]
      .flatMap((n) => {
        const permutations = Array.from(new Set(getPermutations(baseWord, n)));
        return permutations.filter(
          (p) => bonusWordsSet.has(p) || relevantWordsSet.has(p)
        );
      })
      .sort((a, b) => b.length - a.length);

    return {
      baseWord,
      relevantWords: words.filter((w) => relevantWordsSet.has(w)),
      bonusWords: words.filter(
        (w) => bonusWordsSet.has(w) && !relevantWordsSet.has(w)
      ),
    };
  };

export default generateWordSet;
