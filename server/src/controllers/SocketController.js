import { generateRoomID } from "../helpers";
import Rooms from "../models/Rooms";

class SocketController {
  constructor(socket) {
    this.socket = socket;
  }

  createRoom({ name }) {
    const roomID = generateRoomID(Rooms);
    const room = Rooms.add(roomID, { id: this.socket.id, name });

    this.socket.join(roomID);

    this.socket.to(roomID).emit("roomStatus", room);
  }

  joinRoom({ roomID, name }) {
    const room = Rooms.findOneAndAddPlayer(roomID, {
      id: this.socket.id,
      name
    });

    this.socket.join(roomID);

    this.socket.to(roomID).emit("roomStatus", room);
  }
}

export default SocketController;
