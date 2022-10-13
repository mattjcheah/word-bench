import { Room } from "../models/Room";

export type FormattedRoom = Omit<Room, "roomId"> & { id: string };
