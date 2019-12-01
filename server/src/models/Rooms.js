class Rooms {
  static rooms = {};

  static add(roomID, { id, name }) {
    const room = {
      roomID,
      players: {
        [id]: {
          id,
          name
        }
      }
    };

    Rooms.rooms[roomID] = room;
    return room;
  }

  static hasRoom(roomID) {
    return roomID in Rooms.rooms;
  }

  static findOne(roomID) {
    return Rooms.rooms[roomID];
  }

  static findOneAndUpdate(roomID, room) {
    if (!Rooms.hasRoom(roomID)) {
      return undefined;
    }
    Rooms.rooms[roomID] = room;
    return room;
  }

  static findOneAndAddPlayer(roomID, { id, name }) {
    const room = Rooms.findOne(roomID);
    if (!room) {
      return undefined;
    }

    const newRoom = {
      ...room,
      players: {
        ...room.players,
        [id]: {
          id,
          name
        }
      }
    };

    return Rooms.findOneAndUpdate(roomID, newRoom);
  }

  static findOneAndRemovePlayer(roomID, { id }) {
    const room = Rooms.findOne(roomID);
    if (!room) {
      return undefined;
    }

    // eslint-disable-next-line no-unused-vars
    const { [id]: omit, ...players } = room.players;
    const newRoom = {
      ...room,
      players
    };

    return Rooms.findOneAndUpdate(roomID, newRoom);
  }
}

export default Rooms;
