import generateCrossword from "./generateCrossword";
import generateWordSet from "./generateWordSet";

jest.mock("./generateWordSet", () =>
  jest.fn(() => [
    "welfare",
    "fewer",
    "wear",
    "fare",
    "fear",
    "real",
    "feel",
    "leaf",
    "flee",
    "free",
    "era",
    "law",
    "few",
    "raw",
    "fee",
    "war",
    "far",
    "ear"
  ])
);

describe("crosswordGenerator", () => {
  let crossword;
  beforeEach(() => {
    crossword = generateCrossword();
  });

  it("should generate a list of random valid words", () => {
    expect(generateWordSet).toHaveBeenCalled();
  });

  it("should return words", () => {
    expect(crossword.words).toEqual(expect.any(Array));
  });

  it("should have dimensions", () => {
    expect(crossword.height).toEqual(expect.any(Number));
    expect(crossword.width).toEqual(expect.any(Number));
  });

  it("should return letters", () => {
    expect(new Set(crossword.letters)).toEqual(new Set("welfare".split("")));
  });
});
