import { useReducer } from "react";

export function useServer() {
  return useReducer(reducer, {
    socket: null,
    clearError: () => {}
  });
}

function reducer(state, action) {
  switch (action.type) {
    case "INIT_SOCKET":
      return { ...state, socket: action.socket };
    case "INIT_CLEAR_ERROR":
      return { ...state, clearError: action.clearError };
    case "SET_NAME":
      return { ...state, name: action.name };
    case "SET_JOIN_ERROR":
      return { ...state, joinError: action.errorMessage };
    case "UPDATE_ROOM":
      return {
        ...state,
        roomID: action.roomID,
        stage: action.stage,
        players: action.players,
        board: action.board
      };
    case "START_GAME":
      return {
        ...state,
        stage: "GAME"
      };
    case "COMPLETE_WORD":
      return {
        ...state,
        players: {
          ...state.players,
          [action.player.id]: action.player
        }
      };
    default:
      throw new Error();
  }
}
