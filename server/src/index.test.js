import socketIO from "socket.io-client";
import { startServer } from "./index";

jest.mock("./helpers", () => ({
  generateRoomID: jest.fn(() => "0")
}));

describe("Sockets", () => {
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

  describe("createRoom", () => {
    it("should be able to create a room", done => {
      const socket = socketIO("http://localhost:5000");

      socket.emit("createRoom", { name: "CREATE TEST" });

      socket.on("roomStatus", response => {
        expect(response.status).toEqual("SUCCESS");
        expect(response.roomID).toEqual("0");
        expect(response.players).toEqual({
          [socket.id]: {
            id: socket.id,
            name: "CREATE TEST"
          }
        });

        socket.close();
        done();
      });
    });
  });

  describe("joinRoom", () => {
    let socket1;
    beforeAll(done => {
      socket1 = socketIO("http://localhost:5000");
      socket1.emit("createRoom", { name: "CREATE TEST" });
      socket1.on("roomStatus", () => {
        done();
      });
    });

    it("should be able to join a room", done => {
      const socket2 = socketIO("http://localhost:5000");
      socket2.emit("joinRoom", { name: "JOIN TEST 1", roomID: "0" });

      socket2.on("roomStatus", response => {
        expect(response.status).toEqual("SUCCESS");
        expect(response.players).toEqual({
          [socket1.id]: {
            id: socket1.id,
            name: "CREATE TEST"
          },
          [socket2.id]: {
            id: socket2.id,
            name: "JOIN TEST 1"
          }
        });

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

  describe("disconnecting", () => {
    it("should leave rooms before disconnecting", done => {
      const socket1 = socketIO("http://localhost:5000");
      const socket2 = socketIO("http://localhost:5000");

      socket1.emit("createRoom", { name: "disconnect test 1" });

      socket1.on("roomStatus", () => {
        socket2.emit("joinRoom", { roomID: "0", name: "disconnect test 2" });
        socket1.close();

        socket2.on("roomStatus", response => {
          if (socket1.disconnected) {
            expect(response.status).toEqual("SUCCESS");
            expect(response.roomID).toEqual("0");
            expect(response.players).toEqual({
              [socket2.id]: {
                id: socket2.id,
                name: "disconnect test 2"
              }
            });

            socket2.close();
            done();
          }
        });
      });
    });
  });
});
