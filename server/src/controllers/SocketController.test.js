import SocketController from "./SocketController";
import Rooms from "../models/Rooms";

jest.mock("../models/Rooms", () => ({
  add: jest.fn(() => ({
    roomID: "0",
    players: {
      "test id": {
        id: "test id",
        name: "test name"
      }
    }
  })),
  findOneAndAddPlayer: jest.fn(() => ({
    roomID: "0",
    players: {
      hostID: {
        id: "hostID",
        name: "host"
      },
      "test id": {
        id: "test id",
        name: "test name"
      }
    }
  }))
}));

jest.mock("../helpers", () => ({
  generateRoomID: jest.fn(() => "0")
}));

describe("SocketController", () => {
  let fakeSocket;
  let socketController;
  let roomEmit;

  beforeEach(() => {
    roomEmit = jest.fn();
    fakeSocket = {
      id: "test id",
      on: jest.fn(),
      join: jest.fn(),
      to: jest.fn(() => ({
        emit: roomEmit
      }))
    };
    socketController = new SocketController(fakeSocket);
  });

  describe("constructor", () => {
    it("should initialise a socket variable", () => {
      expect(socketController.socket).toEqual(fakeSocket);
    });
  });

  describe("createRoom", () => {
    beforeEach(() => {
      const response = {
        name: "test name"
      };
      socketController.createRoom(response);
    });

    it("should create a room from the given response", () => {
      expect(Rooms.add).toHaveBeenCalledWith("0", {
        id: "test id",
        name: "test name"
      });
    });

    it("should add the socket to the new room", () => {
      expect(socketController.socket.join).toHaveBeenCalledWith("0");
    });

    it("should emit the new room to all room members", () => {
      expect(socketController.socket.to).toHaveBeenCalledWith("0");
      expect(roomEmit).toHaveBeenCalledWith("roomStatus", {
        status: "SUCCESS",
        roomID: "0",
        players: {
          "test id": {
            id: "test id",
            name: "test name"
          }
        }
      });
    });
  });

  describe("joinRoom", () => {
    beforeEach(() => {
      Rooms.add("0", { id: "hostID", name: "host" });

      const response = { roomID: "0", name: "test name" };
      socketController.joinRoom(response);
    });

    it("should add the player to the given room if it exists", () => {
      expect(Rooms.findOneAndAddPlayer).toHaveBeenCalledWith("0", {
        id: "test id",
        name: "test name"
      });
    });

    it("should throw an error if the given room does not exist", () => {});

    it("should add the socket to the new room", () => {
      expect(socketController.socket.join).toHaveBeenCalledWith("0");
    });

    it("should emit the new room to all room members", () => {
      expect(socketController.socket.to).toHaveBeenCalledWith("0");
      expect(roomEmit).toHaveBeenCalledWith("roomStatus", {
        status: "SUCCESS",
        roomID: "0",
        players: {
          hostID: {
            id: "hostID",
            name: "host"
          },
          "test id": {
            id: "test id",
            name: "test name"
          }
        }
      });
    });
  });
});
