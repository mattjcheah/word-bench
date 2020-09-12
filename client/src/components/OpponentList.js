import React from "react";

const OpponentList = ({ currentPlayerId, players, totalNumberOfWords }) => {
  const opponents = Object.values(players)
    .filter(({ id }) => id !== currentPlayerId)
    .map((player) => ({
      ...player,
      completion: Math.round(
        (player.completedWords.length / totalNumberOfWords) * 100
      ),
    }))
    .sort((a, b) => b.completedWords.length - a.completedWords.length);

  return (
    <ul className="skill-list">
      {opponents.map((opponent, ind) => {
        const colourIndex = (ind % 4) + 1;
        const colourClass = "skill-" + colourIndex;
        return (
          <li className="skill" key={opponent + ind}>
            <h3>{opponent.name}</h3>
            <progress
              className={colourClass}
              max="100"
              value={opponent.completion}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default OpponentList;
