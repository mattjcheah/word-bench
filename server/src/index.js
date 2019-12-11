import socketIO from "socket.io";
import SocketController from "./controllers/SocketController";

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 5000;

const server = socketIO(PORT);

export function startServer() {
  server.on("connection", socket => {
    socket.leave(socket.id);
    socket.emit("connectionStatus", { status: "SUCCESS" });

    const socketController = new SocketController(server, socket);

    socket.on("createRoom", socketController.createRoom);

    socket.on("joinRoom", socketController.joinRoom);

    socket.on("startGame", socketController.startGame);

    socket.on("completeWord", socketController.completeWord);

    socket.on("disconnecting", socketController.disconnecting);
  });

  return () => server.close();
}

startServer();
