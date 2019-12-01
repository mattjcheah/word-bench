function generateRoomID(roomsModel) {
  let roomID;
  do {
    roomID = Math.floor(Math.random() * 10000);
  } while (rooms.hasRoom(roomID));
  return roomID;
}

export { generateRoomID };
