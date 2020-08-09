function generateRoomID(roomsModel) {
  let roomID;
  do {
    roomID = Math.floor(Math.random() * 10000);
  } while (roomsModel.hasRoom(roomID) && roomID < 1000);
  return roomID;
}

export { generateRoomID };
