import { Board } from "./Board";

export type Stage = "LOBBY" | "GAME" | "COMPLETE";

export type Player = {
  id: string;
  name: string;
  completedWords: string[];
  active: boolean;
  modifiedAt: string;
};

export type Room = {
  roomId: string;
  createdAt: string;
  modifiedAt: string;
  stage: Stage;
  board: Board;
  players: Player[];
  nextRoomId: string | null;
};

export type CompletedRoom = {
  roomId: string;
  createdAt: string;
  board: Board;
  players: Player[];
};

export type FormattedRoom = Omit<Room, "roomId"> & { id: string };
