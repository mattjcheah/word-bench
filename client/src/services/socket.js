import socketIO from "socket.io-client";

class Socket {
  constructor(dispatch) {
    this.socket = socketIO("http://localhost:5000");
    this.dispatch = dispatch;

    this.updateOnRoomStatus();
    this.updateOnStartGame();
  }

  updateOnRoomStatus = () => {
    this.socket.on(
      "roomStatus",
      ({ status, roomID, players, board, stage }) => {
        if (status === "SUCCESS") {
          this.dispatch({ type: "UPDATE_ROOM", roomID, players, board, stage });
        } else {
          throw new Error("Room status failure");
        }
      }
    );
  };

  updateOnStartGame = () => {
    this.socket.on("startGame", ({ status }) => {
      if (status === "SUCCESS") {
        this.dispatch({ type: "START_GAME" });
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

  startGame = () => {
    this.socket.emit("startGame");
  };

  closeConnection = () => {
    this.socket.close();
  };
}

export default Socket;
