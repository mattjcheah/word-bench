import { gql } from "@apollo/client";
import roomDataFragment from "./roomDataFragment";

const FETCH_ROOM = gql`
  ${roomDataFragment}

  query FETCH_ROOM($roomId: ID!) {
    room(roomId: $roomId) {
      ...RoomData
    }
  }
`;

export default FETCH_ROOM;
