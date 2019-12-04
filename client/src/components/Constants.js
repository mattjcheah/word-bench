export const quotes = [
  {
    quote: "Soz I'm wfh today.",
    author: "Max Philip"
  },
  {
    quote:
      "You better come in today because we need to finish our country trivia quiz.",
    author: "Matt Cheah"
  },
  {
    quote: "There’s 69 days to Christmas my guy.",
    author: "Julian Lee"
  },
  {
    quote: "Define yourself by what you love.",
    author: "Alex Graham"
  },
  {
    quote: "I need you to love me.",
    author: "Justin Ha"
  },
  {
    quote: "I got 45% off EatClub!",
    author: "Christine Liu"
  },
  {
    quote: "I eat pies for breakfast.",
    author: "Jarry Chen"
  },
  {
    quote: "Perfectly balanced, as all things should be.",
    author: "Thanos"
  },
  {
    quote: "It’s bullshit, I did not hit her. I did nooot. Oh hi, Mark.",
    author: "Johnny"
  },
  {
    quote: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    quote: "Quality is not an act, it is a habit.",
    author: "Aristotle"
  }
  // {
  //   quote: "We know what we are, but know not what we may be.",
  //   author: "William Shakespeare"
  // }
  // {
  //   quote: "Well done is better than well said.",
  //   author: "Benjamin Franklin"
  // },
  // {
  //   quote: "Only I can change my life. No one can do it for me.",
  //   author: "Carol Burnett"
  // },
  // {
  //   quote:
  //     "Look up at the stars and not down at your feet. Try to make sense of what you see, and wonder about what makes the universe exist. Be curious.",
  //   author: "Stephen Hawking"
  // },
  // {
  //   quote: "With the new day comes new strength and new thoughts.",
  //   author: "Eleanor Roosevelt"
  // },
  // {
  //   quote: "Life is 10% what happens to you and 90% how you react to it.",
  //   author: "Charles R. Swindoll"
  // },
  // {
  //   quote: "The secret of getting ahead is getting started.",
  //   author: "Mark Twain"
  // },
  // {
  //   quote:
  //     "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.",
  //   author: "Helen Keller"
  // }
];

export const dummy_board_data = {
  roomID: "[roomID]",
  board: {
    height: 9,
    width: 9,
    letters: ["D", "K", "E", "S", "T", "O"],
    words: [
      {
        word: "toe",
        startLocation: [0, 1],
        direction: "DOWN"
      },
      {
        word: "desk",
        startLocation: [2, 0],
        direction: "ACROSS"
      },
      {
        word: "dote",
        startLocation: [2, 0],
        direction: "DOWN"
      },
      {
        word: "toes",
        startLocation: [4, 0],
        direction: "ACROSS"
      },
      {
        word: "stoke",
        startLocation: [4, 3],
        direction: "DOWN"
      },
      {
        word: "stoked",
        startLocation: [6, 1],
        direction: "ACROSS"
      },
      {
        word: "sod",
        startLocation: [6, 1],
        direction: "DOWN"
      },
      {
        word: "does",
        startLocation: [4, 5],
        direction: "DOWN"
      },
      {
        word: "dose",
        startLocation: [4, 5],
        direction: "ACROSS"
      },
      {
        word: "ode",
        startLocation: [2, 8],
        direction: "DOWN"
      },
      {
        word: "doe",
        startLocation: [8, 1],
        direction: "ACROSS"
      }
    ]
  },
  players: {
    "[playerID]": {
      id: "[playerID]",
      name: "[name]",
      completedWords: ["[word]"]
    }
  }
};
