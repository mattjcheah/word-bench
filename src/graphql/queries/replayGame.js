import { gql } from "@apollo/client";

const REPLAY_GAME = gql`
  mutation REPLAY_GAME($roomId: ID!, $name: String!) {
    replayGame(roomId: $roomId, name: $name) {
      id
    }
  }
`;

export default REPLAY_GAME;
