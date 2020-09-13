import { gql } from "@apollo/client";

const CREATE_ROOM = gql`
  mutation CREATE_ROOM($name: String!) {
    createRoom(name: $name) {
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

export default CREATE_ROOM;
