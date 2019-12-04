import { quotes } from "./Constants";

export function getQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

export function validateNewGame(userName, gameLength) {
  if (!userName) {
    return [false, "Please enter your username"];
  }
  if (userName.length < 3) {
    return [false, "Your username is too short (3+ characters)"];
  }
  if (!gameLength) {
    return [false, "Please enter a game length"];
  }
  if (isNaN(gameLength)) {
    return [false, "Your game length is invalid"];
  }
  if (gameLength < 1) {
    return [false, "Your game length is too short (1+ minutes)"];
  }
  if (gameLength > 15) {
    return [false, "Your game length is too long (<15 minutes)"];
  }
  return [true, "ok"];
}

export function validateJoinGame(roomNumber, userName) {
  if (!roomNumber) {
    return [false, "Please enter a room number"];
  }
  if (roomNumber.length !== 4) {
    return [false, "Invalid room number format"];
  }
  if (!userName) {
    return [false, "Please enter your username"];
  }
  if (userName.length < 3) {
    return [false, "Your username is too short (3+ characters)"];
  }
  return [true, "ok"];
}

export const generateBoardKey = (row, col) => {
  return row.toString() + "," + col.toString();
};

export function parseBoardPayload(payload) {
  const boardWidth = payload.board.width;
  const boardHeight = payload.board.height;
  const words = payload.board.words;

  let boardRep = {};

  for (var i = 0; i < boardWidth; i++) {
    for (var j = 0; j < boardHeight; j++) {
      boardRep[generateBoardKey(i, j)] = {
        content: "_",
        found: false
      };
    }
  }

  words.forEach(word => {
    let startRow = word.startLocation[0];
    let startCol = word.startLocation[1];

    switch (word.direction) {
      case "DOWN":
        for (let i = 0; i < word.word.length; i++) {
          boardRep[generateBoardKey(startRow + i, startCol)] = {
            content: word.word[i],
            found: true
          };
        }
        break;
      case "ACROSS":
        for (let i = 0; i < word.word.length; i++) {
          boardRep[generateBoardKey(startRow, startCol + i)] = {
            content: word.word[i],
            found: true
          };
        }
        break;
      default:
        console.log("word direction error");
    }
  });

  return boardRep;
}
