import React from "react";
import "./NumberOfQuestionsInput.css";

const NumberOfQuestionsInput = ({ numberOfQuestions, setNumberOfQuestions }) => {
  return (
    <div id="numberOfQuestionsContainer">
      <label>
        問題数:
        <input
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(parseInt(e.target.value, 10))}
          min="1"
          max="10"
        />
      </label>
    </div>
  );
};

export { NumberOfQuestionsInput };