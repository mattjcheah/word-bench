const generateRoomId = (roomIds) => {
  let roomId;
  do {
    roomId = Math.floor(Math.random() * 10000);
  } while (roomIds.includes(roomId));
  return roomId.toString();
};

const formatRoom = (room) => ({
  ...room,
  id: room.roomId,
});

export { generateRoomId, formatRoom };
