import socketIO from "socket.io";

const PORT = 5000;

const io = socketIO(PORT);

export function startServer() {
  const nameToSocket = {};
  const rooms = {};
  io.on("connection", socket => {
    socket.emit("connectionStatus", { status: "SUCCESS" });

    socket.on("createRoom", response => {
      const roomID = generateRoomID(rooms);
      const room = {
        roomID,
        players: {
          [response.name]: {
            name: response.name
          }
        }
      };

      rooms[roomID] = room;
      nameToSocket[response.name] = socket;

      socket.join(roomID);
      socket.emit("roomStatus", {
        status: "SUCCESS",
        players: Object.values(room.players)
      });
    });

    socket.on("joinRoom", response => {
      const { roomID, name } = response;

      // TODO: Error checking on whether it's a room
      const room = {
        ...rooms[roomID],
        players: {
          ...rooms[roomID].players,
          [name]: {
            name
          }
        }
      };

      // TODO: Error checking on whether the person's name already exists?
      nameToSocket[name] = socket;

      socket.join(roomID).emit("roomStatus", {
        status: "SUCCESS",
        players: Object.values(room.players)
      });
    });
  });

  return () => io.close();
}

function generateRoomID(rooms) {
  let roomID;
  do {
    roomID = Math.random(0, 100000);
  } while (rooms.hasOwnProperty(roomID));
  return roomID;
}

startServer();
