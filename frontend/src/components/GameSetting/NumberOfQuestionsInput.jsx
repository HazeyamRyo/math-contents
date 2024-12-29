import React, { useState } from "react";
import "./NumberOfQuestionsInput.css";

const NumberOfQuestionsInput = ({ numberOfQuestions, setNumberOfQuestions , maxQuestions}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
      const numericValue = parseInt(value, 10);
      if (numericValue <= maxQuestions) {
        setNumberOfQuestions(numericValue || 0);
        setErrorMessage("");
      } else {
        setErrorMessage(`※${maxQuestions}以下の数字を入力してください`);
        setTimeout(() => {
          setNumberOfQuestions(""); // 入力フォームを空にする
        }, 500);
      }
  };

  return (
    <div id="numberOfQuestionsContainer">
      <label>
        問題数:
        <input
          type="number"
          value={numberOfQuestions}
          onChange={handleChange}
          min="1"
          max={maxQuestions}
        />
      </label>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
};

export { NumberOfQuestionsInput };