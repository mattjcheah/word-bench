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

  it("should return a crossword configuration", () => {
    expect(crossword).toBeTruthy();
  });
});
