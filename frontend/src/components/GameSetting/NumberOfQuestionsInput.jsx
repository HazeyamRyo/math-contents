import React, { useState } from "react";
import "./NumberOfQuestionsInput.css";

const NumberOfQuestionsInput = ({ setNumberOfQuestions, maxQuestions }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    const numericValue = parseInt(value, 10);
    if (numericValue <= maxQuestions && numericValue > -1) {
      setNumberOfQuestions(numericValue || 0);
      setErrorMessage("");
      setInputValue(value);
    } else {
      setErrorMessage(`※1以上${maxQuestions}以下の数字を入力してください`);
      setTimeout(() => {
        setInputValue(""); // 入力フォームを空にする
        setNumberOfQuestions(0); // 問題数を0にする
      }, 500);
    }
  };


  return (
    <div id="numberOfQuestionsContainer">
      <label>
        問題数:
        <input
          type="number"
          value={inputValue}
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