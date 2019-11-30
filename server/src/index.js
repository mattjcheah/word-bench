import socketIO from "socket.io";
import { generateRoomID } from "./helpers";
import SocketController from "./SocketController";

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
          [socket.id]: {
            id: socket.id,
            name: response.name
          }
        }
      };

      rooms[roomID] = room;
      nameToSocket[response.name] = socket;

      socket.join(roomID);
      socket.emit("roomStatus", {
        status: "SUCCESS",
        roomID,
        players: Object.values(room.players)
      });
    });

    socket.on("joinRoom", response => {
      const { roomID, name } = response;

      if (!rooms.hasOwnProperty(roomID)) {
        socket.emit("roomStatus", {
          status: "FAILURE",
          reason: "Room does not exist"
        });
      } else {
        const room = {
          ...rooms[roomID],
          players: {
            ...rooms[roomID].players,
            [socket.id]: {
              id: socket.id,
              name
            }
          }
        };

        rooms[roomID] = room;

        // TODO: Error checking on whether the person's name already exists?
        nameToSocket[name] = socket;

        socket.join(roomID);

        io.to(roomID).emit("roomStatus", {
          status: "SUCCESS",
          roomID,
          players: Object.values(room.players)
        });
      }
    });

    socket.on("disconnecting", () => {
      Object.keys(socket.rooms).forEach(roomID => {
        if (rooms.hasOwnProperty(roomID)) {
          const { [socket.id]: omit, ...players } = rooms[roomID].players;
          const room = {
            ...rooms[roomID],
            players
          };

          rooms[roomID] = room;

          socket.to(roomID).emit("roomStatus", {
            status: "SUCCESS",
            roomID,
            players: Object.values(room.players)
          });
        }
      });
    });
  });

  return () => io.close();
}

startServer();
