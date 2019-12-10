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

export function parseBoardData(boardData, completedWords) {
  const result = initialiseBoard(boardData.height, boardData.width);

  boardData.words.forEach(addWordToBoard(completedWords, result));

  return result;
}

function initialiseBoard(height, width) {
  const result = [];
  for (let i = 0; i < height; i++) {
    let row = [];
    for (let j = 0; j < width; j++) {
      row.push({ content: "_", found: false });
    }
    result.push(row);
  }
  return result;
}

function addWordToBoard(completedWords, result) {
  return function({ word, direction, startLocation }) {
    const found = completedWords.includes(word);
    word.split("").forEach((letter, index) => {
      const [row, col] = getIndexes(startLocation, index, direction);
      if (result[row][col].content === "_" || !result[row][col].found) {
        result[row][col] = { content: letter, found };
      }
    });
  };
}

function getIndexes([startRow, startCol], currentIndex, direction) {
  if (direction === "DOWN") {
    return [startRow + currentIndex, startCol];
  }
  if (direction === "ACROSS") {
    return [startRow, startCol + currentIndex];
  }
  throw new Error("Invalid direction");
}
