import getUserId from "../config/getUserId";

export const quotes = [
  {
    quote: "Soz I'm wfh today.",
    author: "Max Philip",
  },
  {
    quote:
      "You better come in today because we need to finish our country trivia quiz.",
    author: "Matt Cheah",
  },
  {
    quote: "Define yourself by what you love.",
    author: "Alex Graham",
  },
  {
    quote: "I need you to love me.",
    author: "Justin Ha",
  },
  {
    quote: "I got 45% off EatClub!",
    author: "Christine Liu",
  },
  {
    quote: "I eat pies for breakfast.",
    author: "Jarry Chen",
  },
  {
    quote: "Perfectly balanced, as all things should be.",
    author: "Thanos",
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    quote: "Quality is not an act, it is a habit.",
    author: "Aristotle",
  },
  {
    quote: "🥺",
    author: "Sarah Karim",
  },
  {
    quote: "Live. Laugh. Love.",
    author: "Adam Slomoi",
  },
];

export const mockRoomData = {
  roomID: "1234",
  stage: "GAME",
  board: {
    height: 9,
    width: 9,
    letters: ["D", "K", "E", "S", "T", "O"],
    words: [
      {
        word: "toe",
        startLocation: { rowNum: 0, colNum: 1 },
        direction: "DOWN",
      },
      {
        word: "desk",
        startLocation: { rowNum: 2, colNum: 0 },
        direction: "ACROSS",
      },
      {
        word: "dote",
        startLocation: { rowNum: 2, colNum: 0 },
        direction: "DOWN",
      },
      {
        word: "toes",
        startLocation: { rowNum: 4, colNum: 0 },
        direction: "ACROSS",
      },
      {
        word: "stoke",
        startLocation: { rowNum: 4, colNum: 3 },
        direction: "DOWN",
      },
      {
        word: "stoked",
        startLocation: { rowNum: 6, colNum: 1 },
        direction: "ACROSS",
      },
      {
        word: "sod",
        startLocation: { rowNum: 6, colNum: 1 },
        direction: "DOWN",
      },
      {
        word: "does",
        startLocation: { rowNum: 4, colNum: 5 },
        direction: "DOWN",
      },
      {
        word: "dose",
        startLocation: { rowNum: 4, colNum: 5 },
        direction: "ACROSS",
      },
      {
        word: "ode",
        startLocation: { rowNum: 2, colNum: 8 },
        direction: "DOWN",
      },
      {
        word: "doe",
        startLocation: { rowNum: 8, colNum: 1 },
        direction: "ACROSS",
      },
    ],
  },
  players: [
    {
      id: getUserId(),
      name: "test",
      completedWords: ["stoked", "ode"],
    },
    {
      id: "user-1",
      name: "asdf",
      completedWords: [],
    },
    {
      id: "user-2",
      name: "1234124",
      completedWords: ["ode"],
    },
  ],
};
