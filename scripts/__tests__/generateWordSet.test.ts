import generateWordSet from "../generateWordSet";

describe("generateWordSet", () => {
  it("returns relevant and bonus words that can be made from a single word", () => {
    const relevantWordsSet = new Set(["test", "stop"]);
    const bonusWordsSet = new Set(["tes", "top", "est"]);
    const wordSet = generateWordSet(relevantWordsSet, bonusWordsSet)("testop");
    expect(wordSet).toEqual({
      baseWord: "testop",
      relevantWords: ["test", "stop"],
      bonusWords: ["tes", "top", "est"],
    });
  });

  it("returns words sorted in descending length order", () => {
    const relevantWordsSet = new Set(["abcdefg", "abcdef"]);
    const bonusWordsSet = new Set(["abcdefg", "abcdef", "abcde", "abcd"]);
    const wordSet = generateWordSet(relevantWordsSet, bonusWordsSet)("gfedcba");
    expect(wordSet).toEqual({
      baseWord: "gfedcba",
      relevantWords: ["abcdefg", "abcdef"],
      bonusWords: ["abcde", "abcd"],
    });
  });
});
