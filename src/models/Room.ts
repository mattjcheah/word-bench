import { Board } from "./Board";

export type Stage = "LOBBY" | "GAME" | "COMPLETE";

export type Room = {
  roomId: string;
  modifiedAt: string;
  stage: Stage;
  board: Board;
  players: {
    id: string;
    name: string;
    completedWords: string[];
    active: boolean;
  }[];
  nextRoomId: string | null;
};
