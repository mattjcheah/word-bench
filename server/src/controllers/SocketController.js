import { generateRoomID } from "../helpers";
import Rooms from "../models/Rooms";

class SocketController {
  constructor(server, socket) {
    this.server = server;
    this.socket = socket;
  }

  createRoom = ({ name }) => {
    const roomID = generateRoomID(Rooms);
    const room = Rooms.add(roomID, { id: this.socket.id, name });

    this.socket.join(roomID);

    this.server.to(roomID).emit("roomStatus", {
      status: "SUCCESS",
      ...room
    });
  };

  joinRoom = ({ roomID, name }) => {
    const room = Rooms.findOneAndAddPlayer(roomID, {
      id: this.socket.id,
      name
    });

    if (!room) {
      this.socket.emit("roomStatus", {
        status: "FAILURE",
        reason: "Room does not exist"
      });
      return;
    }

    this.socket.join(roomID);

    this.server.to(roomID).emit("roomStatus", {
      status: "SUCCESS",
      ...room
    });
  };

  disconnecting = () => {
    Object.keys(this.socket.rooms).forEach(roomID => {
      const room = Rooms.findOneAndRemovePlayer(roomID, { id: this.socket.id });

      this.server.to(roomID).emit("roomStatus", {
        status: "SUCCESS",
        ...room
      });
    });
  };
}

export default SocketController;
