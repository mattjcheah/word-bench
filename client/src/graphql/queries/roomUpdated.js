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
    }
  }
`;

export default ROOM_UPDATED;
