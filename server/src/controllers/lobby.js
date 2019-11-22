const generateRoomKey = rooms => {
  let roomKey;
  do {
    roomKey = Math.random(0, 10000);
  } while (rooms.includes(roomKey));

  return roomKey;
};

const createRoom = (socket, sockets, rooms) => ({ name }) => {
  console.log("test");
  sockets[socket.id] = name;
  const roomKey = generateRoomKey(rooms);
  socket.join(roomKey.toString());

  socket.emit("roomStatus", JSON.stringify({ status: "joined" }));
};

const joinRoom = socket => ({ name, roomKey }) => {
  sockets[socket.id] = name;
  if (rooms.includes(roomKey)) {
    socket.join(roomKey.toString());
  }

  socket.emit("roomStatus", JSON.stringify({ status: "joined" }));
};

export { createRoom, joinRoom };
