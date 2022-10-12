import sub from "date-fns/sub";
import { generateRoomId } from "../helpers";

const createRoomsService = (databaseRepository) => {
  const generateRoomData = async ({ roomId, playerId, name }) => {
    const boardCount = await databaseRepository.fetchBoardsCount();
    const boardId = Number(roomId) % boardCount;
    const { data: board } = await databaseRepository.fetchBoard(boardId);

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

  const cleanupOldRooms = () => {
    const now = new Date();
    const expiryDate = sub(now, { hours: 2 });
    return databaseRepository.deleteRooms(expiryDate.toISOString());
  };

  const getAvailableRoomId = async () => {
    await cleanupOldRooms();
    const rooms = await databaseRepository.fetchRoomIds();
    const roomIds = rooms.map(({ roomId }) => Number(roomId));
    return generateRoomId(roomIds);
  };

  const add = async (roomId, { playerId, name }) => {
    const roomData = await generateRoomData({ roomId, playerId, name });

    const room = await databaseRepository.addRoom(roomData);
    return room;
  };

  const findOne = (roomId) => {
    return databaseRepository.fetchRoom(roomId);
  };

  const findOneAndUpdate = async (roomId, updatedRoomData) => {
    const room = await databaseRepository.updateRoom(roomId, updatedRoomData);
    return room;
  };

  const findOneAndAddPlayer = async (roomId, { playerId, name }) => {
    const room = await findOne(roomId);

    const updatedRoomData = {
      players: [
        ...room.players,
        {
          id: playerId,
          name,
          completedWords: [],
        },
      ],
    };

    return findOneAndUpdate(roomId, updatedRoomData);
  };

  const findOneAndActivatePlayer = async (roomId, playerId) => {
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

  const findOneAndDeactivatePlayer = async (roomId, playerId) => {
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

  const findOneAndAddCompletedWord = async (roomId, { playerId, word }) => {
    const room = await findOne(roomId);

    if (!room || room.stage === "COMPLETE") {
      return undefined;
    }

    const player = room.players.find((p) => p.id === playerId);
    const completedWords = [...new Set(player.completedWords.concat(word))];
    const updatedPlayer = {
      ...player,
      completedWords,
    };
    const players = room.players.map((player) =>
      player.id === playerId ? updatedPlayer : player
    );

    const gameIsComplete =
      updatedPlayer.completedWords.length === room.board.words.length;
    const stage = gameIsComplete ? "COMPLETE" : "GAME";

    const updatedRoomData = {
      stage,
      players,
    };

    return findOneAndUpdate(roomId, updatedRoomData);
  };

  const joinNextRoom = async (roomId, { playerId, name }) => {
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
    findOneAndAddPlayer,
    findOneAndUpdate,
    findOneAndActivatePlayer,
    findOneAndDeactivatePlayer,
    findOneAndAddCompletedWord,
    joinNextRoom,
  };
};

export default createRoomsService;
