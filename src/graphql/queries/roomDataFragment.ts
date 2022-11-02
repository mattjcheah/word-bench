import { gql } from "@apollo/client";

const ROOM_DATA_FRAGMENT = gql`
  fragment RoomData on Room {
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
`;

export default ROOM_DATA_FRAGMENT;
