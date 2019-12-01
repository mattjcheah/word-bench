import socketIO from "socket.io";
import { generateRoomID } from "./helpers";
import Rooms from "./models/Rooms";
// import SocketController from "./SocketController";

const PORT = 5000;

const io = socketIO(PORT);

export function startServer() {
  const nameToSocket = {};
  io.on("connection", socket => {
    socket.leave(socket.id);
    socket.emit("connectionStatus", { status: "SUCCESS" });

    socket.on("createRoom", response => {
      const roomID = generateRoomID(Rooms);

      const room = Rooms.add(roomID, { id: socket.id, name: response.name });

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

      if (!Rooms.hasRoom(roomID)) {
        socket.emit("roomStatus", {
          status: "FAILURE",
          reason: "Room does not exist"
        });
      } else {
        const room = Rooms.findOneAndAddPlayer(roomID, {
          id: socket.id,
          name: response.name
        });

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
        if (Rooms.hasRoom(roomID)) {
          const room = Rooms.findOneAndRemovePlayer(roomID, { id: socket.id });

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
