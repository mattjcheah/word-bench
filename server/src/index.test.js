import socketIO from "socket.io-client";
import { startServer } from "./index";

describe("socket test", () => {
  let closeServer;

  beforeAll(() => {
    closeServer = startServer();
  });

  afterAll(() => {
    closeServer();
  });

  it("should connect to the socket", done => {
    const socket = socketIO("http://localhost:5000");

    socket.on("connectionStatus", status => {
      expect(JSON.parse(status)).toEqual({ status: "connected" });
      socket.close();
      done();
    });
  });

  it("should be able to create a room", done => {
    const socket = socketIO("http://localhost:5000");

    socket.emit("createRoom", JSON.stringify({ name: "Test" }));

    socket.on("roomStatus", status => {
      expect(JSON.parse(status)).toEqual({ status: "joined" });
      socket.close();
      done();
    });
  });
});
