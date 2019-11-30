function generateRoomID(rooms) {
  let roomID;
  do {
    roomID = Math.floor(Math.random() * 10000);
  } while (rooms.hasOwnProperty(roomID));
  return roomID;
}

export { generateRoomID };
