import * as lobby from "./lobby";

describe("lobby", () => {
  let socketMock;

  beforeEach(() => {
    socketMock = {
      emit: jest.fn(),
      join: jest.fn()
    };
  });

  describe("createRoom", () => {
    it("should be able to create a room when none exist", done => {
      Math.random = jest.fn(() => 123);

      let sockets = {};
      let rooms = [];
      lobby.createRoom(socketMock, sockets, rooms);

      expect(socketMock.join).toHaveBeenCalledWith("123");
      done();
    });
  });
});
