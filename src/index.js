import express from "express";
import http from "http";
import socketIO from "socket.io";
import SocketController from "./controllers/SocketController";

const app = express();
const httpServer = http.Server(app);
const server = socketIO(httpServer);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT);

export function startServer() {
  app.get("/", function(req, res) {
    res.send("test");
  });

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
