import React from "react";
import "./ModeSelector.css";

const ModeSelector = ({ mode, onModeChange, props }) => {
  return (
    <div className="mode-selector">
      <div className="mode-option">
        <label className="mode-option-label">
          <input className="mode-option-input"
            type="radio"
            name="mode"
            value="normal"
            checked={mode === "normal"}
            onChange={(e) => onModeChange(e.target.value)}
          />
          {props.normalMode}
        </label>
      </div>
      <div className="mode-option">
        <label className="mode-option-label">
          <input className="mode-option-input"
            type="radio"
            name="mode"
            value="timeattack"
            checked={mode === "timeattack"}
            onChange={(e) => onModeChange(e.target.value)}
          />
          {props.timeAttackMode}
        </label>
      </div>
    </div>
  );
};

export{ ModeSelector };