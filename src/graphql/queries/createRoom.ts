import { gql } from "@apollo/client";
import roomDataFragment from "./roomDataFragment";

const CREATE_ROOM = gql`
  ${roomDataFragment}

  mutation CREATE_ROOM($name: String!) {
    createRoom(name: $name) {
      ...RoomData
    }
  }
`;

export default CREATE_ROOM;
