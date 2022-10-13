import { Room } from "../models/Room";
import { FormattedRoom } from "./types";

const generateRoomId = (roomIds: number[]): string => {
  let roomId: number;
  do {
    roomId = Math.floor(Math.random() * 10000);
  } while (roomIds.includes(roomId));
  return roomId.toString();
};

const formatRoom = (room: Room): FormattedRoom => ({
  ...room,
  id: room.roomId,
});

export { generateRoomId, formatRoom };
