import React from "react";

const ModeSelector = ({ mode, onModeChange, props }) => {
  return (
    <div>
      <label>
        <input
          type="radio"
          name="mode"
          value="normal"
          checked={mode === "normal"}
          onChange={(e) => onModeChange(e.target.value)}
        />
        {props.normalMode}
      </label>
      <label>
        <input
          type="radio"
          name="mode"
          value="timeattack"
          checked={mode === "timeattack"}
          onChange={(e) => onModeChange(e.target.value)}
        />
        {props.timeAttackMode}
      </label>
    </div>
  );
};

export{ ModeSelector };