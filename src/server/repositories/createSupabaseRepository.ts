import { SupabaseClient } from "@supabase/supabase-js";
import { Board } from "../../models/Board";
import { CompletedRoom, Room } from "../../models/Room";

export type DatabaseRepository = {
  fetchRoom: (roomId: string) => Promise<Room | null>;
  fetchRoomIds: () => Promise<Pick<Room, "roomId">[]>;
  fetchBoard: (boardId: number) => Promise<Board>;
  fetchBoardsCount: () => Promise<number>;
  addRoom: (roomData: Partial<Room>) => Promise<Room>;
  updateRoom: (roomId: string, roomData: Partial<Room>) => Promise<Room>;
  deleteRooms: (date: string) => Promise<void>;
  addCompletedRoom: (roomData: CompletedRoom) => Promise<void>;
};

const createSupabaseRepository = (
  supabase: SupabaseClient
): DatabaseRepository => {
  return {
    async fetchRoom(roomId) {
      const { data } = await supabase
        .from("rooms")
        .select(
          "id, roomId, stage, players, board, nextRoomId, createdAt, modifiedAt"
        )
        .eq("roomId", roomId)
        .single();

      return data;
    },

    async fetchRoomIds() {
      const { data } = await supabase.from("rooms").select("roomId");
      return data ?? [];
    },

    async fetchBoard(boardId) {
      const { data } = await supabase
        .from("boards")
        .select("height, width, letters, words")
        .eq("id", boardId)
        .single();

      if (!data) {
        throw new Error(`Board id "${boardId}" not found`);
      }

      return data;
    },
    async fetchBoardsCount() {
      const { count } = await supabase
        .from("boards")
        .select("id", { count: "exact", head: true });
      return count ?? 0;
    },

    async addRoom(roomData) {
      const { data, error } = await supabase
        .from("rooms")
        .insert([{ ...roomData, modifiedAt: new Date().toISOString() }])
        .select("*")
        .single();

      if (error) {
        throw new Error(`Unexpected error when adding room: ${error.message}`);
      }

      return data;
    },

    async updateRoom(roomId, updatedRoomData) {
      const { data } = await supabase
        .from("rooms")
        .update({ ...updatedRoomData, modifiedAt: new Date().toISOString() })
        .eq("roomId", roomId)
        .select("*")
        .single();

      return data;
    },

    async deleteRooms(date) {
      await supabase.from("rooms").delete().lt("modifiedAt", date);
    },

    async addCompletedRoom(roomData) {
      await supabase
        .from("completed_rooms")
        .insert([{ ...roomData, completedAt: new Date().toISOString() }]);
    },
  };
};

export default createSupabaseRepository;
