import { gql } from "@apollo/client";

const JOIN_ROOM = gql`
  mutation JOIN_ROOM($roomId: ID!, $name: String!) {
    joinRoom(roomId: $roomId, name: $name) {
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

export default JOIN_ROOM;
