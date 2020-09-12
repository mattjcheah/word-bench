import React from "react";

const OpponentList = ({ opponents: opponentList }) => {
  const opponents = opponentList
    .slice()
    .sort((a, b) => (a.completion < b.completion ? 1 : -1));

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
