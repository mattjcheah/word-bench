import React from "react";
import styled from "styled-components";

import LandingLayout from "./LandingLayout";
import LandingButton from "./LandingButton";

const RoomTitle = styled.h2`
  font-size: 1rem;
  font-weight: 900;
`;

const PlayerList = styled.ul`
  margin: 3rem 0;
  padding: 0;
  list-style: none;
`;

const Lobby = ({ roomId, players, startGame }) => {
  return (
    <LandingLayout title="Waiting for more players...">
      <div>
        <RoomTitle>Room ID: {roomId}</RoomTitle>
        <PlayerList>
          {players.map((player) => {
            return (
              <li key={player.id}>
                <p>{player.name}</p>
              </li>
            );
          })}
        </PlayerList>
        <div>
          <LandingButton onClick={() => startGame()}>START</LandingButton>
        </div>
      </div>
    </LandingLayout>
  );
};

export default Lobby;
