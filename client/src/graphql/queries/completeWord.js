import { gql } from "@apollo/client";

const COMPLETE_WORD = gql`
  mutation COMPLETE_WORD($roomId: ID!, $word: String!) {
    completeWord(roomId: $roomId, word: $word) {
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

export default COMPLETE_WORD;
