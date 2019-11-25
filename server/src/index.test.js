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

  it("should be able to join a room", done => {
    Math.random = jest.fn(() => 0);

    const socket1 = socketIO("http://localhost:5000");
    const socket2 = socketIO("http://localhost:5000");

    socket1.emit("createRoom", { name: "TEST" });
    socket2.emit("joinRoom", { name: "TEST1", roomID: "0" });

    socket2.on("roomStatus", response => {
      expect(response.status).toEqual("SUCCESS");
      expect(response.players).toEqual([
        {
          name: "TEST"
        },
        {
          name: "TEST1"
        }
      ]);

      socket1.close();
      socket2.close();
      done();
    });
  });

  it("should fail to join a room that does not exist", done => {
    const socket = socketIO("http://localhost:5000");

    socket.emit("joinRoom", { name: "TEST1", roomID: "1" });

    socket.on("roomStatus", response => {
      expect(response.status).toEqual("FAILURE");
      expect(response.reason).toEqual("Room does not exist");

      socket.close();
      done();
    });
  });
});
