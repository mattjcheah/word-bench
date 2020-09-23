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
  {
    quote: "Hey that's kitty kat!!! *points to hello kitty*",
    author: "Rawad",
  },
  {
    quote: "Your eyes look hazelnut",
    author: "Rawad",
  },
];

export const mockRoomData = {
  id: "1234",
  stage: "GAME",
  board: {
    height: 14,
    width: 15,
    letters: ["r", "f", "a", "y", "c", "o", "t"],
    words: [
      {
        word: "factory",
        startLocation: {
          rowNum: 7,
          colNum: 4,
        },
        direction: "ACROSS",
      },
      {
        word: "factor",
        startLocation: {
          rowNum: 4,
          colNum: 7,
        },
        direction: "DOWN",
      },
      {
        word: "actor",
        startLocation: {
          rowNum: 2,
          colNum: 10,
        },
        direction: "ACROSS",
      },
      {
        word: "craft",
        startLocation: {
          rowNum: 0,
          colNum: 10,
        },
        direction: "DOWN",
      },
      {
        word: "forty",
        startLocation: {
          rowNum: 4,
          colNum: 7,
        },
        direction: "ACROSS",
      },
      {
        word: "cart",
        startLocation: {
          rowNum: 5,
          colNum: 2,
        },
        direction: "DOWN",
      },
      {
        word: "coat",
        startLocation: {
          rowNum: 5,
          colNum: 2,
        },
        direction: "ACROSS",
      },
      {
        word: "fact",
        startLocation: {
          rowNum: 0,
          colNum: 8,
        },
        direction: "ACROSS",
      },
      {
        word: "tray",
        startLocation: {
          rowNum: 5,
          colNum: 5,
        },
        direction: "DOWN",
      },
      {
        word: "act",
        startLocation: {
          rowNum: 1,
          colNum: 6,
        },
        direction: "DOWN",
      },
      {
        word: "art",
        startLocation: {
          rowNum: 8,
          colNum: 1,
        },
        direction: "DOWN",
      },
      {
        word: "car",
        startLocation: {
          rowNum: 11,
          colNum: 4,
        },
        direction: "DOWN",
      },
      {
        word: "cat",
        startLocation: {
          rowNum: 2,
          colNum: 6,
        },
        direction: "ACROSS",
      },
      {
        word: "cry",
        startLocation: {
          rowNum: 11,
          colNum: 4,
        },
        direction: "ACROSS",
      },
      {
        word: "far",
        startLocation: {
          rowNum: 6,
          colNum: 0,
        },
        direction: "DOWN",
      },
      {
        word: "fat",
        startLocation: {
          rowNum: 0,
          colNum: 8,
        },
        direction: "DOWN",
      },
      {
        word: "for",
        startLocation: {
          rowNum: 1,
          colNum: 13,
        },
        direction: "DOWN",
      },
      {
        word: "rat",
        startLocation: {
          rowNum: 8,
          colNum: 0,
        },
        direction: "ACROSS",
      },
      {
        word: "toy",
        startLocation: {
          rowNum: 9,
          colNum: 6,
        },
        direction: "DOWN",
      },
      {
        word: "try",
        startLocation: {
          rowNum: 9,
          colNum: 6,
        },
        direction: "ACROSS",
      },
    ],
  },
  players: [
    {
      id: getUserId(),
      name: "test",
      completedWords: ["factory", "try", "far"],
    },
    {
      id: "user-1",
      name: "asdf",
      completedWords: [],
    },
    {
      id: "user-2",
      name: "1234124",
      completedWords: ["far"],
    },
  ],
};
