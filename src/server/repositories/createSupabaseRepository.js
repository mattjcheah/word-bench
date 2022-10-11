const createSupabaseRepository = (supabase) => {
  const fetchRoom = async (roomId) => {
    const { data, error } = await supabase
      .from("rooms")
      .select("id, roomId, stage, players, board, nextRoomId")
      .eq("roomId", roomId);
    if (error) {
      throw new Error(`Unexpected error when fetching room: ${error.message}`);
    }
    if (!data || data.length !== 1) {
      throw new Error(`Could not find room with ID ${roomId}`);
    }

    return data[0];
  };

  const fetchRoomIds = async () => {
    const { data } = await supabase.from("rooms").select("roomId");
    return data;
  };

  const fetchBoard = async (boardId) => {
    const { data } = await supabase
      .from("boards")
      .select("data")
      .eq("id", boardId);
    return data[0];
  };

  const fetchBoardsCount = async () => {
    const { count } = await supabase
      .from("boards")
      .select("id", { count: "exact", head: true });
    return count;
  };

  const addRoom = async (roomData) => {
    const { data, error } = await supabase
      .from("rooms")
      .insert([{ ...roomData, modifiedAt: new Date().toISOString() }]);

    if (error) {
      throw new Error(`Unexpected error when adding room: ${error.message}`);
    }

    return data[0];
  };

  const updateRoom = async (roomId, updatedRoomData) => {
    const { data } = await supabase
      .from("rooms")
      .update({ ...updatedRoomData, modifiedAt: new Date().toISOString() })
      .eq("roomId", roomId);

    return data ? data[0] : null;
  };

  const deleteRoom = async (roomId) => {
    await supabase.from("rooms").delete().eq("roomId", roomId);
  };

  return {
    fetchRoom,
    fetchRoomIds,
    fetchBoard,
    fetchBoardsCount,
    addRoom,
    updateRoom,
    deleteRoom,
  };
};

export default createSupabaseRepository;
