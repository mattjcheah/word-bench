import { gql } from "@apollo/client";

const START_GAME = gql`
  mutation START_GAME($roomId: ID!) {
    startGame(roomId: $roomId) {
      id
    }
  }
`;

export default START_GAME;
