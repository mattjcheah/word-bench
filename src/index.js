import express from "express";
import http from "http";
import socketIO from "socket.io";
import SocketController from "./controllers/SocketController";

const app = express();
const httpServer = http.Server(app);
const server = socketIO(httpServer);
const path = require("path");

const PORT = process.env.PORT || 5000;

setupExpress();
startServer();

httpServer.listen(PORT);

function setupExpress() {
  app.use(express.static(path.join(__dirname, "../client/dist")));

  app.get("/*", (_req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

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
