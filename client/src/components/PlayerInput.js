import React, { useState } from "react";

const PlayerInput = ({ onSubmit }) => {
  const [currentInput, setCurrentInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidWord = onSubmit(currentInput);
    if (isValidWord) {
      setCurrentInput("");
    }
  };

  return (
    <form className="field" onSubmit={handleSubmit}>
      <input
        type="text"
        id="searchterm"
        placeholder="Enter a Word..."
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        autoComplete="off"
      />
      <button type="submit">GO</button>
    </form>
  );
};

export default PlayerInput;
