import Rooms from "./Rooms";

jest.mock("./generateBoard", () => () => ({
  height: 0,
  width: 0,
  words: []
}));

describe("Rooms", () => {
  beforeEach(() => {
    Rooms.rooms = {};
  });

  describe("createRoom", () => {
    it("should return a room object", () => {
      expect(
        Rooms.createRoom({ roomID: "roomID", id: "id", name: "name" })
      ).toEqual({
        roomID: "roomID",
        stage: "LOBBY",
        board: { height: 0, width: 0, words: [] },
        players: {
          id: {
            id: "id",
            name: "name",
            completedWords: []
          }
        }
      });
    });
  });

  describe("add", () => {
    it("should add a player to a room", () => {
      Rooms.add("0", { id: "id test", name: "name test" });
      expect(Rooms.rooms["0"].players).toEqual({
        "id test": {
          id: "id test",
          name: "name test",
          completedWords: []
        }
      });
    });
  });

  describe("hasRoom", () => {
    it("should return true if the room exists", () => {
      Rooms.add("0", { id: "id", name: "name" });
      expect(Rooms.hasRoom("0")).toBe(true);
    });

    it("should return false if the room does not exist", () => {
      expect(Rooms.hasRoom("0")).toBe(false);
    });
  });

  describe("findOne", () => {
    it("should return the correct room if it exists", () => {
      Rooms.add("0", { id: "id", name: "name" });
      expect(Rooms.findOne("0")).toEqual({
        roomID: "0",
        stage: "LOBBY",
        board: { height: 0, width: 0, words: [] },
        players: {
          id: {
            id: "id",
            name: "name",
            completedWords: []
          }
        }
      });
    });

    it("should return undefined if the room does not exist", () => {
      expect(Rooms.findOne("0")).toBe(undefined);
    });
  });

  describe("findOneAndUpdate", () => {
    describe("given the room exists", () => {
      beforeEach(() => {
        Rooms.add("0", { id: "id", name: "name" });
      });

      it("should update a room", () => {
        Rooms.findOneAndUpdate("0", {
          roomID: "0",
          stage: "LOBBY",
          players: {
            "new id": { id: "new id", name: "new name", completedWords: [] }
          }
        });

        expect(Rooms.rooms["0"]).toEqual({
          roomID: "0",
          stage: "LOBBY",
          players: {
            "new id": { id: "new id", name: "new name", completedWords: [] }
          }
        });
      });

      it("should return the updated room", () => {
        const room = Rooms.findOneAndUpdate("0", {
          roomID: "0",
          stage: "LOBBY",
          players: {
            "new id": { id: "new id", name: "new name", completedWords: [] }
          }
        });

        expect(room).toEqual({
          roomID: "0",
          stage: "LOBBY",
          players: {
            "new id": { id: "new id", name: "new name", completedWords: [] }
          }
        });
      });
    });

    describe("given the room does not exist", () => {
      let room;
      beforeEach(() => {
        room = Rooms.findOneAndUpdate("0", {
          roomID: "0",
          players: {
            "new id": { id: "new id", name: "new name", completedWords: [] }
          }
        });
      });

      it("should return undefined", () => {
        expect(room).toBeUndefined();
      });

      it("should not modify rooms", () => {
        expect(Rooms.rooms).toEqual({});
      });
    });
  });

  describe("findOneAndAddPlayer", () => {
    describe("given the room exists", () => {
      beforeEach(() => {
        Rooms.add("0", { id: "id", name: "name" });
      });

      it("should add a player to the given room", () => {
        Rooms.findOneAndAddPlayer("0", { id: "new id", name: "new name" });

        expect(Rooms.rooms["0"].players).toEqual({
          id: { id: "id", name: "name", completedWords: [] },
          "new id": { id: "new id", name: "new name", completedWords: [] }
        });
      });

      it("should return the updated room", () => {
        const room = Rooms.findOneAndAddPlayer("0", {
          id: "new id",
          name: "new name"
        });

        expect(room).toEqual({
          roomID: "0",
          stage: "LOBBY",
          board: { height: 0, width: 0, words: [] },
          players: {
            id: { id: "id", name: "name", completedWords: [] },
            "new id": { id: "new id", name: "new name", completedWords: [] }
          }
        });
      });
    });

    describe("given the room does not exist", () => {
      let room;
      beforeEach(() => {
        room = Rooms.findOneAndAddPlayer("0", {
          id: "new id",
          name: "new name"
        });
      });

      it("should return undefined", () => {
        expect(room).toEqual(undefined);
      });

      it("should not modify rooms", () => {
        expect(Rooms.rooms).toEqual({});
      });
    });
  });

  describe("findOneAndRemovePlayer", () => {
    describe("given the room exists", () => {
      beforeEach(() => {
        Rooms.add("0", { id: "id", name: "name" });
      });

      it("should remove the only player from the given room", () => {
        Rooms.findOneAndRemovePlayer("0", { id: "id" });

        expect(Rooms.rooms["0"]).toEqual({
          roomID: "0",
          stage: "LOBBY",
          board: { height: 0, width: 0, words: [] },
          players: {}
        });
      });

      it("should remove the given player from the given room", () => {
        Rooms.findOneAndAddPlayer("0", { id: "new id", name: "new name" });
        Rooms.findOneAndRemovePlayer("0", { id: "new id" });

        expect(Rooms.rooms["0"]).toEqual({
          roomID: "0",
          stage: "LOBBY",
          board: { height: 0, width: 0, words: [] },
          players: {
            id: {
              id: "id",
              name: "name",
              completedWords: []
            }
          }
        });
      });

      it("should return the updated room", () => {
        const room = Rooms.findOneAndRemovePlayer("0", { id: "id" });

        expect(room).toEqual({
          roomID: "0",
          stage: "LOBBY",
          board: { height: 0, width: 0, words: [] },
          players: {}
        });
      });
    });

    describe("given the room does not exist", () => {
      let room;
      beforeEach(() => {
        room = Rooms.findOneAndRemovePlayer("0", { id: "id" });
      });

      it("should return undefined", () => {
        expect(room).toEqual(undefined);
      });

      it("should not modify rooms", () => {
        expect(Rooms.rooms).toEqual({});
      });
    });

    // TODO: Test to check error if given player does not exist
  });

  describe("findOneAndChangeStage", () => {
    describe("given the room exists", () => {
      beforeEach(() => {
        Rooms.add("0", { id: "id", name: "name" });
      });

      it("should change the stage of the room", () => {
        Rooms.findOneAndChangeStage("0", { stage: "GAME" });

        expect(Rooms.rooms["0"].stage).toEqual("GAME");
      });

      it("should return the updated room", () => {
        const room = Rooms.findOneAndChangeStage("0", { stage: "GAME" });

        expect(room.stage).toEqual("GAME");
      });
    });

    describe("given the room does not exist", () => {
      let room;
      beforeEach(() => {
        room = Rooms.findOneAndChangeStage("0", {
          stage: "GAME"
        });
      });

      it("should return undefined", () => {
        expect(room).toEqual(undefined);
      });

      it("should not modify rooms", () => {
        expect(Rooms.rooms).toEqual({});
      });
    });
  });
});
