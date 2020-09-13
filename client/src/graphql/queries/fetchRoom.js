import { gql } from "@apollo/client";

const FETCH_ROOM = gql`
  query FETCH_ROOM($roomId: ID!) {
    room(roomId: $roomId) {
      id
      stage
      players {
        id
        name
        completedWords
      }
    }
  }
`;

export default FETCH_ROOM;
