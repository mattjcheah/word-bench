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

    socket.on("connectionStatus", response => {
      expect(response.status).toEqual("SUCCESS");

      socket.close();
      done();
    });
  });

  it("should be able to create a room", done => {
    const socket = socketIO("http://localhost:5000");

    socket.emit("createRoom", { name: "TEST" });

    socket.on("roomStatus", response => {
      expect(response.status).toEqual("SUCCESS");
      expect(response.players).toEqual([
        {
          name: "TEST"
        }
      ]);

      socket.close();
      done();
    });
  });
});
