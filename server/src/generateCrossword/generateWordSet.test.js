import generateWordSet from "./generateWordSet";
import * as helpers from "./helpers";

jest.mock("./helpers", () => ({
  getRandomBaseWord: jest.fn(() => "welfare"),
  getWords: jest.fn(() => [
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
}));

describe("generateWordSet", () => {
  const validWords = [
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
  ];

  it("should return a list of valid words", () => {
    expect(generateWordSet()).toEqual(validWords);
  });

  it("should use a random base word to generate the list", () => {
    expect(helpers.getRandomBaseWord).toHaveBeenCalled();
  });
});
