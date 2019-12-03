import { useReducer } from "react";

export function useServer() {
  return useReducer(reducer, {
    socket: null
  });
}

function reducer(state, action) {
  switch (action.type) {
    case "INIT_SOCKET":
      return { ...state, socket: action.socket };
    case "SET_NAME":
      return { ...state, name: action.name };
    case "UPDATE_ROOM":
      return {
        ...state,
        roomID: action.roomID,
        players: action.players
      };
    default:
      throw new Error();
  }
}
