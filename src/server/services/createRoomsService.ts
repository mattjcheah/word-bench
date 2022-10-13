import sub from "date-fns/sub";
import { DatabaseRepository } from "../repositories/createSupabaseRepository";
import { generateRoomId } from "../helpers";
import { Room, Stage } from "../../models/Room";

type GetAvailableRoomId = () => Promise<string>;

type Add = (
  roomId: string,
  args: { playerId: string; name: string }
) => Promise<Room>;

type FindOne = (roomId: string) => Promise<Room>;

type FindOneAndUpdate = (
  roomId: string,
  roomData: Partial<Room>
) => Promise<Room>;

type FindOneAndAddPlayer = (
  roomId: string,
  args: { playerId: string; name: string }
) => Promise<Room>;

type FindOneAndActivatePlayer = (
  roomId: string,
  playerId: string
) => Promise<Room | null>;

type FindOneAndDeactivatePlayer = (
  roomId: string,
  playerId: string
) => Promise<Room | null>;

type FindOneAndAddCompletedWord = (
  roomId: string,
  args: { playerId: string; word: string }
) => Promise<Room | null>;

type JoinNextRoom = (
  roomId: string,
  args: { playerId: string; name: string }
) => Promise<Room | null>;

export type RoomsService = {
  getAvailableRoomId: GetAvailableRoomId;
  add: Add;
  findOne: FindOne;
  findOneAndUpdate: FindOneAndUpdate;
  findOneAndAddPlayer: FindOneAndAddPlayer;
  findOneAndActivatePlayer: FindOneAndActivatePlayer;
  findOneAndDeactivatePlayer: FindOneAndDeactivatePlayer;
  findOneAndAddCompletedWord: FindOneAndAddCompletedWord;
  joinNextRoom: JoinNextRoom;
};

const createRoomsService = (
  databaseRepository: DatabaseRepository
): RoomsService => {
  const generateRoomData = async ({
    roomId,
    playerId,
    name,
  }: {
    roomId: string;
    playerId: string;
    name: string;
  }): Promise<Partial<Room>> => {
    const boardCount = await databaseRepository.fetchBoardsCount();
    const boardId = Number(roomId) % boardCount;
    const board = await databaseRepository.fetchBoard(boardId);

    return {
      roomId,
      stage: "LOBBY",
      board,
      players: [
        {
          id: playerId,
          name,
          completedWords: [],
          active: true,
        },
      ],
    };
  };

  const cleanupOldRooms = (): Promise<Room[]> => {
    const now = new Date();
    const expiryDate = sub(now, { hours: 2 });
    return databaseRepository.deleteRooms(expiryDate.toISOString());
  };

  const getAvailableRoomId: GetAvailableRoomId = async () => {
    await cleanupOldRooms();
    const rooms = await databaseRepository.fetchRoomIds();
    const roomIds = rooms.map(({ roomId }) => Number(roomId));
    return generateRoomId(roomIds);
  };

  const add: Add = async (roomId, { playerId, name }) => {
    const roomData = await generateRoomData({ roomId, playerId, name });

    const room = await databaseRepository.addRoom(roomData);
    return room;
  };

  const findOne: FindOne = (roomId) => {
    return databaseRepository.fetchRoom(roomId);
  };

  const findOneAndUpdate: FindOneAndUpdate = async (
    roomId,
    updatedRoomData
  ) => {
    const room = await databaseRepository.updateRoom(roomId, updatedRoomData);
    return room;
  };

  const findOneAndAddPlayer: FindOneAndAddPlayer = async (
    roomId,
    { playerId, name }
  ) => {
    const room = await findOne(roomId);

    const updatedRoomData = {
      players: [
        ...room.players,
        {
          id: playerId,
          name,
          completedWords: [],
          active: true,
        },
      ],
    };

    return findOneAndUpdate(roomId, updatedRoomData);
  };

  const findOneAndActivatePlayer: FindOneAndActivatePlayer = async (
    roomId,
    playerId
  ) => {
    const room = await findOne(roomId);

    if (!room) {
      return null;
    }

    const updatedRoomData = {
      players: room.players.map((player) =>
        player.id === playerId ? { ...player, active: true } : player
      ),
    };

    return findOneAndUpdate(roomId, updatedRoomData);
  };

  const findOneAndDeactivatePlayer: FindOneAndDeactivatePlayer = async (
    roomId,
    playerId
  ) => {
    const room = await findOne(roomId);

    if (!room) {
      return null;
    }

    const updatedRoomData = {
      players: room.players.map((player) =>
        player.id === playerId ? { ...player, active: false } : player
      ),
    };

    return findOneAndUpdate(roomId, updatedRoomData);
  };

  const findOneAndAddCompletedWord: FindOneAndAddCompletedWord = async (
    roomId,
    { playerId, word }
  ) => {
    const room = await findOne(roomId);

    if (!room || room.stage === "COMPLETE") {
      return null;
    }

    const player = room.players.find((p) => p.id === playerId);

    if (!player) {
      return null;
    }

    const completedWords = [...new Set([...player.completedWords, word])];
    const updatedPlayer = {
      ...player,
      completedWords,
    };
    const players = room.players.map((player) =>
      player.id === playerId ? updatedPlayer : player
    );

    const gameIsComplete =
      updatedPlayer.completedWords.length === room.board.words.length;
    const stage: Stage = gameIsComplete ? "COMPLETE" : "GAME";

    const updatedRoomData = {
      stage,
      players,
    };

    return findOneAndUpdate(roomId, updatedRoomData);
  };

  const joinNextRoom: JoinNextRoom = async (roomId, { playerId, name }) => {
    const room = await findOne(roomId);
    if (!room) {
      return null;
    }

    await findOneAndDeactivatePlayer(roomId, playerId);

    if (room.nextRoomId) {
      return findOneAndAddPlayer(room.nextRoomId, { playerId, name });
    }

    const nextRoomId = await getAvailableRoomId();

    await findOneAndUpdate(roomId, { nextRoomId });

    return add(nextRoomId, { playerId, name });
  };

  return {
    getAvailableRoomId,
    add,
    findOne,
    findOneAndUpdate,
    findOneAndAddPlayer,
    findOneAndActivatePlayer,
    findOneAndDeactivatePlayer,
    findOneAndAddCompletedWord,
    joinNextRoom,
  };
};

export default createRoomsService;
