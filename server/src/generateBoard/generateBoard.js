function generateBoard() {
  return {
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
  };
}

export default generateBoard;
