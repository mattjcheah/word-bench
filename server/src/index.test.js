import socketIO from "socket.io-client";
import { startServer } from "./index";

jest.mock("./helpers", () => ({
  generateRoomID: jest.fn(() => "0")
}));

jest.mock("./models/generateBoard", () => () => ({
  height: 9,
  width: 9,
  words: [
    {
      word: "toe",
      startLocation: [0, 1],
      direction: "DOWN"
    },
    {
      word: "desk",
      startLocation: [2, 0],
      direction: "ACROSS"
    },
    {
      word: "dote",
      startLocation: [2, 0],
      direction: "DOWN"
    },
    {
      word: "toes",
      startLocation: [4, 0],
      direction: "ACROSS"
    },
    {
      word: "stoke",
      startLocation: [4, 3],
      direction: "DOWN"
    },
    {
      word: "stoked",
      startLocation: [6, 1],
      direction: "ACROSS"
    },
    {
      word: "sod",
      startLocation: [6, 1],
      direction: "DOWN"
    },
    {
      word: "does",
      startLocation: [4, 5],
      direction: "DOWN"
    },
    {
      word: "dose",
      startLocation: [4, 5],
      direction: "ACROSS"
    },
    {
      word: "ode",
      startLocation: [2, 8],
      direction: "DOWN"
    },
    {
      word: "doe",
      startLocation: [8, 1],
      direction: "ACROSS"
    }
  ]
}));

describe("Sockets", () => {
  const testBoard = {
    height: 9,
    width: 9,
    words: [
      {
        word: "toe",
        startLocation: [0, 1],
        direction: "DOWN"
      },
      {
        word: "desk",
        startLocation: [2, 0],
        direction: "ACROSS"
      },
      {
        word: "dote",
        startLocation: [2, 0],
        direction: "DOWN"
      },
      {
        word: "toes",
        startLocation: [4, 0],
        direction: "ACROSS"
      },
      {
        word: "stoke",
        startLocation: [4, 3],
        direction: "DOWN"
      },
      {
        word: "stoked",
        startLocation: [6, 1],
        direction: "ACROSS"
      },
      {
        word: "sod",
        startLocation: [6, 1],
        direction: "DOWN"
      },
      {
        word: "does",
        startLocation: [4, 5],
        direction: "DOWN"
      },
      {
        word: "dose",
        startLocation: [4, 5],
        direction: "ACROSS"
      },
      {
        word: "ode",
        startLocation: [2, 8],
        direction: "DOWN"
      },
      {
        word: "doe",
        startLocation: [8, 1],
        direction: "ACROSS"
      }
    ]
  };
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
            name: "CREATE TEST",
            completedWords: []
          }
        });
        expect(response.board).toEqual(testBoard);

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
            name: "CREATE TEST",
            completedWords: []
          },
          [socket2.id]: {
            id: socket2.id,
            name: "JOIN TEST 1",
            completedWords: []
          }
        });
        expect(response.board).toEqual(testBoard);

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
                name: "disconnect test 2",
                completedWords: []
              }
            });
            expect(response.board).toEqual(testBoard);

            socket2.close();
            done();
          }
        });
      });
    });
  });
});
