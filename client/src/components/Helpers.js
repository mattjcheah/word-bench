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
  if (roomNumber.length < 6) {
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
