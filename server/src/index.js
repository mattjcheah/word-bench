import socketIO from "socket.io";
import * as lobby from "./controllers/lobby";

const PORT = 5000;

const io = socketIO(PORT);

const sockets = {};
const rooms = [];

export function handleConnection(socket) {
  // console.log("Connection established!");

  socket.emit(
    "connectionStatus",
    JSON.stringify({
      status: "connected"
    })
  );

  socket.on("createRoom", lobby.createRoom(socket, sockets, rooms));

  socket.on("joinRoom", lobby.joinRoom(socket));

  socket.on("disconnect", function() {
    // console.log("Disconnected!");
  });
}

export function startServer() {
  io.on("connection", handleConnection);
  // console.log(`Server listening on ${PORT}`);
  return () => io.close();
}

startServer();
