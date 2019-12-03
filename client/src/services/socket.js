import socketIO from "socket.io-client";

class Socket {
  constructor(dispatch) {
    this.socket = socketIO("http://localhost:5000");
    this.dispatch = dispatch;

    this.updateOnRoomStatus();
  }

  updateOnRoomStatus = () => {
    this.socket.on("roomStatus", ({ status, roomID, players }) => {
      console.log(players);
      if (status === "SUCCESS") {
        this.dispatch({ type: "UPDATE_ROOM", roomID, players });
      } else {
        throw new Error("Room status failure");
      }
    });
  };

  createRoom = name => {
    this.socket.emit("createRoom", { name });

    this.dispatch({ type: "SET_NAME", name });
  };

  joinRoom = (name, roomID) => {
    this.socket.emit("joinRoom", { name, roomID });

    this.dispatch({ type: "SET_NAME", name });
  };

  closeConnection = () => {
    this.socket.close();
  };
}

export default Socket;
