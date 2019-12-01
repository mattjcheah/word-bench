import Rooms from "./Rooms";

describe("Rooms", () => {
  beforeEach(() => {
    Rooms.rooms = {};
  });
  describe("add", () => {
    it("should add a player to a room", () => {
      Rooms.add("0", { id: "id test", name: "name test" });
      expect(Rooms.rooms["0"].players).toEqual({
        "id test": {
          id: "id test",
          name: "name test"
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
        players: {
          id: {
            id: "id",
            name: "name"
          }
        }
      });
    });

    it("should return undefined if the room does not exist", () => {
      expect(Rooms.findOne("0")).toBe(undefined);
    });
  });

  describe("findOneAndUpdate", () => {
    it("should update a room", () => {
      Rooms.add("0", { id: "id", name: "name" });
      Rooms.findOneAndUpdate("0", {
        roomID: "0",
        players: { "new id": { id: "new id", name: "new name" } }
      });

      expect(Rooms.rooms["0"]).toEqual({
        roomID: "0",
        players: { "new id": { id: "new id", name: "new name" } }
      });
    });

    it("should return the updated room", () => {
      Rooms.add("0", { id: "id", name: "name" });
      const room = Rooms.findOneAndUpdate("0", {
        roomID: "0",
        players: { "new id": { id: "new id", name: "new name" } }
      });

      expect(room).toEqual({
        roomID: "0",
        players: { "new id": { id: "new id", name: "new name" } }
      });
    });
  });

  describe("findOneAndAddPlayer", () => {
    beforeEach(() => {
      Rooms.add("0", { id: "id", name: "name" });
    });
    it("should add a player to the given room", () => {
      Rooms.findOneAndAddPlayer("0", { id: "new id", name: "new name" });

      expect(Rooms.rooms["0"].players).toEqual({
        id: { id: "id", name: "name" },
        "new id": { id: "new id", name: "new name" }
      });
    });

    it("should return the updated room", () => {
      const room = Rooms.findOneAndAddPlayer("0", {
        id: "new id",
        name: "new name"
      });

      expect(room).toEqual({
        roomID: "0",
        players: {
          id: { id: "id", name: "name" },
          "new id": { id: "new id", name: "new name" }
        }
      });
    });
  });

  describe("findOneAndRemovePlayer", () => {
    beforeEach(() => {
      Rooms.add("0", { id: "id", name: "name" });
    });

    it("should remove the only player from the given room", () => {
      Rooms.findOneAndRemovePlayer("0", { id: "id" });

      expect(Rooms.rooms["0"]).toEqual({
        roomID: "0",
        players: {}
      });
    });

    it("should remove the given player from the given room", () => {
      Rooms.findOneAndAddPlayer("0", { id: "new id", name: "new name" });
      Rooms.findOneAndRemovePlayer("0", { id: "new id" });

      expect(Rooms.rooms["0"]).toEqual({
        roomID: "0",
        players: {
          id: {
            id: "id",
            name: "name"
          }
        }
      });
    });

    it("should return the updated room", () => {
      const room = Rooms.findOneAndRemovePlayer("0", { id: "id" });

      expect(room).toEqual({
        roomID: "0",
        players: {}
      });
    });
  });
});
