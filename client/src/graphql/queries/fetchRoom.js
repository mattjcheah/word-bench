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
      board {
        height
        width
        letters
        words {
          word
          startLocation {
            rowNum
            colNum
          }
          direction
        }
      }
    }
  }
`;

export default FETCH_ROOM;
