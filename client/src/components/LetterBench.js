import React from "react";

import ShuffleButton from "./ShuffleButton";

const LetterBench = ({ letters, shuffleLetters }) => {
  return (
    <div className="letterBench">
      <div style={{ display: "flex" }}>
        {letters.map((letter, ind) => {
          return (
            <div className="letterTileContainer" key={letter + ind}>
              <div className="letterTileInner">{letter.toUpperCase()}</div>
            </div>
          );
        })}
        <ShuffleButton shuffleLetters={shuffleLetters} />
      </div>
    </div>
  );
};

export default LetterBench;
