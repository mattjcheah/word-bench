import { FormattedRoom, Player } from "../../models/Room";
import { formatRoom } from "../helpers";
import { GraphQLContext } from "./createContext";

type RoomQueryResolver = (
  parent: unknown,
  args: { roomId: string },
  context: GraphQLContext
) => Promise<FormattedRoom | null>;

type CreateRoomMutationResolver = (
  parent: unknown,
  args: { name: string },
  context: GraphQLContext
) => Promise<FormattedRoom>;

type JoinRoomMutationResolver = (
  parent: unknown,
  args: { roomId: string; name: string },
  context: GraphQLContext
) => Promise<FormattedRoom>;

type StartGameMutationResolver = (
  parent: unknown,
  args: { roomId: string },
  context: GraphQLContext
) => Promise<FormattedRoom>;

type CompleteWordMutationResolver = (
  parent: unknown,
  args: { roomId: string; word: string },
  context: GraphQLContext
) => Promise<Player>;

type ReplayGameMutationResolver = (
  parent: unknown,
  args: { roomId: string; name: string },
  context: GraphQLContext
) => Promise<FormattedRoom>;

type Resolvers = {
  Query: {
    room: RoomQueryResolver;
  };
  Mutation: {
    createRoom: CreateRoomMutationResolver;
    joinRoom: JoinRoomMutationResolver;
    startGame: StartGameMutationResolver;
    completeWord: CompleteWordMutationResolver;
    replayGame: ReplayGameMutationResolver;
  };
};

const resolvers: Resolvers = {
  Query: {
    async room(_, { roomId }, { playerId, roomsService }) {
      const room = await roomsService.findOne(roomId);

      if (!room || !room.players.find((p) => p.id === playerId)) {
        return null;
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
    async startGame(_, { roomId }, { playerId, roomsService }) {
      const room = await roomsService.findOneAndUpdate(roomId, {
        stage: "GAME",
      });

      if (!room || !room.players.find((p) => p.id === playerId)) {
        throw new Error("Room not found");
      }

      return formatRoom(room);
    },
    async completeWord(_, { roomId, word }, { playerId, roomsService }) {
      const room = await roomsService.findOneAndAddCompletedWord(roomId, {
        playerId,
        word,
      });

      const player = room?.players.find((p) => p.id === playerId);
      if (!room || !player) {
        throw new Error("Room not found");
      }

      return player;
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
