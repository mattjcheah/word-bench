import socketIO from "socket.io-client";

class Socket {
  constructor(dispatch) {
    this.socket = socketIO();
    this.dispatch = dispatch;

    this.updateOnRoomStatus();
    this.updateOnStartGame();
    this.updateOnCompleteWord();
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

  updateOnCompleteWord = () => {
    this.socket.on("completeWord", ({ status, ...player }) => {
      if (status === "SUCCESS") {
        this.dispatch({ type: "COMPLETE_WORD", player });
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

  completeWord = (
    { roomID, board: { words } },
    completedWords,
    submittedWord
  ) => {
    const word = submittedWord.toLowerCase();
    if (
      words.filter(w => w.word === word).length > 0 &&
      !completedWords.includes(word)
    ) {
      this.socket.emit("completeWord", { roomID, word });
      return true;
    }
    return false;
  };

  closeConnection = () => {
    this.socket.close();
  };
}

export default Socket;
