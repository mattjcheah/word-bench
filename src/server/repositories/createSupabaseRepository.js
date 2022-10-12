const createSupabaseRepository = (supabase) => {
  const fetchRoom = async (roomId) => {
    const { data, error } = await supabase
      .from("rooms")
      .select("id, roomId, stage, players, board, nextRoomId")
      .eq("roomId", roomId)
      .single();

    if (error) {
      throw new Error(`Unexpected error when fetching room: ${error.message}`);
    }

    return data;
  };

  const fetchRoomIds = async () => {
    const { data } = await supabase.from("rooms").select("roomId");
    return data;
  };

  const fetchBoard = async (boardId) => {
    const { data } = await supabase
      .from("boards")
      .select("data")
      .eq("id", boardId)
      .single();
    return data;
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
      .insert([{ ...roomData, modifiedAt: new Date().toISOString() }])
      .single();

    if (error) {
      throw new Error(`Unexpected error when adding room: ${error.message}`);
    }

    return data;
  };

  const updateRoom = async (roomId, updatedRoomData) => {
    const { data } = await supabase
      .from("rooms")
      .update({ ...updatedRoomData, modifiedAt: new Date().toISOString() })
      .eq("roomId", roomId)
      .single();

    return data;
  };

  const deleteRooms = (date) => {
    return supabase.from("rooms").delete().lt("modifiedAt", date);
  };

  return {
    fetchRoom,
    fetchRoomIds,
    fetchBoard,
    fetchBoardsCount,
    addRoom,
    updateRoom,
    deleteRooms,
  };
};

export default createSupabaseRepository;
