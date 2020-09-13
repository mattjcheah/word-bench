import { gql } from "@apollo/client";

const ROOM_UPDATED = gql`
  subscription ROOM_UPDATED($roomId: ID!) {
    roomUpdated(roomId: $roomId) {
      id
      stage
      players {
        id
        name
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

export default ROOM_UPDATED;
