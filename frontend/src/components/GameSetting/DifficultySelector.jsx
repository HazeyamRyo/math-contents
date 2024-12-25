import React from "react";
import "./DifficultySelector.css";

const DifficultySelector = ({ difficulty, onDifficultyChange , props }) => {
  return (
    <div className="difficulty-selector">
      <label className="difficulty-label">
        <input className="difficulty-input"
          type="radio"
          name="difficulty"
          value="normal"
          checked={difficulty === "normal"}
          onChange={(e) => onDifficultyChange(e.target.value)}
        />
        {props.normalDifficulty}
      </label>
      <label className="difficulty-label">
        <input className="difficulty-input"
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