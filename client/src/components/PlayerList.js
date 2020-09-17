import React from "react";
import styled from "styled-components";

const COLOURS = ["#ff9e2c", "#4ecdc4", "#ff6b6b", "#5fce64"];

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 1rem;
`;

const Progress = styled.div`
  background: ${({ colour, percentage }) =>
    `linear-gradient(to right, ${colour} ${percentage}%, #888 ${percentage}% 100%)`};
  color: white;
  padding: 0.5rem 1rem;
`;

const PlayerList = ({ players, totalNumberOfWords }) => {
  const sortedPlayers = players
    .map((player) => ({
      ...player,
      completion: Math.round(
        (player.completedWords.length / totalNumberOfWords) * 100
      ),
    }))
    .sort((a, b) => b.completedWords.length - a.completedWords.length);

  return (
    <List>
      {sortedPlayers.map((player, i) => {
        return (
          <ListItem key={player.id}>
            <Progress
              percentage={player.completion}
              colour={COLOURS[i % COLOURS.length]}
            >
              <h3>{player.name}</h3>
            </Progress>
          </ListItem>
        );
      })}
    </List>
  );
};

export default PlayerList;
