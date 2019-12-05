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

function generateBoardKey([startRow, startCol], currentIndex, direction) {
  if (direction === "DOWN") {
    return formatBoardKey(startRow + currentIndex, startCol);
  }
  if (direction === "ACROSS") {
    return formatBoardKey(startRow, startCol + currentIndex);
  }
  throw new Error("Invalid direction");
}

export function formatBoardKey(row, col) {
  return row.toString() + "," + col.toString();
}

export function parseBoardPayload(boardPayload, completedWords) {
  const boardWidth = boardPayload.width;
  const boardHeight = boardPayload.height;
  const words = boardPayload.words;

  let boardRep = {};

  for (var i = 0; i < boardWidth; i++) {
    for (var j = 0; j < boardHeight; j++) {
      boardRep[formatBoardKey(i, j)] = {
        content: "_",
        found: false
      };
    }
  }

  words.forEach(({ word, direction, startLocation }) => {
    for (let i = 0; i < word.length; i++) {
      const boardKey = generateBoardKey(startLocation, i, direction);
      if (boardRep[boardKey].content === "_" || !boardRep[boardKey].found) {
        boardRep[boardKey] = {
          content: word[i],
          found: completedWords.includes(word)
        };
      }
    }
  });

  return boardRep;
}

export function generateOpponents(userID, players, totalNumberOfWords) {
  return Object.values(players)
    .filter(({ id }) => id !== userID)
    .map(player => ({
      ...player,
      completion: Math.round(
        (player.completedWords.length / totalNumberOfWords) * 100
      )
    }))
    .sort((a, b) => b.completedWords.length - a.completedWords.length);
}
