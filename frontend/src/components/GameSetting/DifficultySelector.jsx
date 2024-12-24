import React from "react";

const DifficultySelector = ({ difficulty, onDifficultyChange , props }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          name="difficulty"
          value="normal"
          checked={difficulty === "normal"}
          onChange={(e) => onDifficultyChange(e.target.value)}
        />
        {props.normalDifficulty}
      </label>
      <label>
        <input
          type="radio"
          name="difficulty"
          value="hard"
          checked={difficulty === "hard"}
          onChange={(e) => onDifficultyChange(e.target.value)}
        />
        {props.hardDifficulty}
      </label>
    </div>
  );
};

export  { DifficultySelector };