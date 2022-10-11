import { formatRoom } from "../helpers";

const resolvers = {
  Query: {
    async room(_, { roomId }, { playerId, roomsService }) {
      const room = await roomsService.findOne(roomId);

      if (!room || !room.players.find((p) => p.id === playerId)) {
        throw new Error("Room not found");
      }

      return formatRoom(room);
    },
  },
  Mutation: {
    async createRoom(_, { name }, { playerId, roomsService }) {
      const roomId = await roomsService.getAvailableRoomId();
      const room = await roomsService.add(roomId, { playerId, name });

      if (!room) {
        throw new Error("Room not found");
      }

      return formatRoom(room);
    },
    async joinRoom(_, { roomId, name }, { playerId, roomsService }) {
      const room = await roomsService.findOneAndAddPlayer(roomId, {
        playerId,
        name,
      });
      if (!room) {
        throw new Error("Room not found");
      }

      return formatRoom(room);
    },
    async startGame(_, { roomId }, { roomsService }) {
      // TODO: Check that user is in the given room
      const room = await roomsService.findOneAndUpdate(roomId, {
        stage: "GAME",
      });
      return formatRoom(room);
    },
    async completeWord(_, { roomId, word }, { playerId, roomsService }) {
      const room = await roomsService.findOneAndAddCompletedWord(roomId, {
        playerId,
        word,
      });

      if (!room) {
        throw new Error("Room not found");
      }

      return room.players.find((p) => p.id === playerId);
    },
    async replayGame(_, { roomId, name }, { playerId, roomsService }) {
      const room = await roomsService.joinNextRoom(roomId, {
        playerId,
        name,
      });

      if (!room) {
        throw new Error("Room not found");
      }

      return formatRoom(room);
    },
  },
};

export default resolvers;
