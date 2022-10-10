const typeDefs = /* GraphQL */ `
  type Query {
    room(roomId: ID!): Room
  }

  type Mutation {
    createRoom(name: String!): Room!
    joinRoom(roomId: ID!, name: String!): Room!
    startGame(roomId: ID!): Room!
    completeWord(roomId: ID!, word: String!): Player!
    replayGame(roomId: ID!, name: String!): Room!
  }

  type Room {
    id: ID!
    stage: String!
    players: [Player!]!
    board: Board!
  }

  type Player {
    id: ID!
    name: String!
    completedWords: [String!]!
  }

  type Board {
    height: Int!
    width: Int!
    letters: [String!]!
    words: [Word!]!
  }

  type Word {
    word: String!
    startLocation: Location!
    direction: Direction!
  }

  enum Direction {
    ACROSS
    DOWN
  }

  type Location {
    rowNum: Int!
    colNum: Int!
  }
`;

export default typeDefs;
