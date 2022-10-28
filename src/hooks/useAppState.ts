import { useReducer } from "react";
import shuffle from "lodash/shuffle";
import { FormattedRoom } from "../models/Room";

type State = { room: FormattedRoom | null; loading: boolean };

const initialState: State = { room: null, loading: false };

type SetLoadingAction = {
  type: "setLoading";
  data: {
    loading: boolean;
  };
};

type LoadRoomAction = {
  type: "loadRoom";
  data: { room: FormattedRoom };
};

type UpdateRoomAction = {
  type: "updateRoom";
  data: { room: FormattedRoom };
};

type ShuffleLettersAction = {
  type: "shuffleLetters";
};

type CompleteWordAction = {
  type: "completeWord";
  data: {
    playerId: string;
    word: string;
  };
};

type GiveUpAction = {
  type: "giveUp";
};

type Action =
  | SetLoadingAction
  | LoadRoomAction
  | UpdateRoomAction
  | ShuffleLettersAction
  | CompleteWordAction
  | GiveUpAction;

type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
  if (action.type === "setLoading") {
    return {
      ...state,
      loading: action.data.loading,
    };
  }

  if (action.type === "loadRoom") {
    return { ...state, room: action.data.room };
  }

  if (!state.room) {
    return state;
  }

  if (action.type === "updateRoom") {
    const { stage: currentStage, players: currentPlayers } = state.room;
    const { stage: updatedStage, players: updatedPlayers } = action.data.room;

    return {
      ...state,
      room: {
        ...state.room,
        stage: currentStage === "COMPLETE" ? currentStage : updatedStage,
        players: updatedPlayers.map((updatedPlayer) => {
          const player = currentPlayers.find((p) => p.id === updatedPlayer.id);

          if (!player) return updatedPlayer;

          return {
            ...updatedPlayer,
            completedWords: Array.from(
              new Set([
                ...player.completedWords,
                ...updatedPlayer.completedWords,
              ])
            ),
          };
        }),
      },
    };
  }

  if (action.type === "shuffleLetters") {
    const { board } = state.room;
    return {
      ...state,
      room: {
        ...state.room,
        board: {
          ...board,
          letters: shuffle(board.letters),
        },
      },
    };
  }

  if (action.type === "completeWord") {
    const { playerId, word } = action.data;
    return {
      ...state,
      room: {
        ...state.room,
        players: state.room.players.map((player) =>
          player.id === playerId
            ? {
                ...player,
                completedWords: [...player.completedWords, word],
              }
            : player
        ),
      },
    };
  }

  if (action.type === "giveUp") {
    return {
      ...state,
      room: {
        ...state.room,
        stage: "COMPLETE",
      },
    };
  }

  return state;
};

const useAppState = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return { state, dispatch };
};

export default useAppState;
