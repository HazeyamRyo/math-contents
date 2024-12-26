import React from 'react'

export const NumberOfQuestions = ({score}) => {
  return (
    <div className="score">
      <div id="scoreText">問題番号</div>
      <div id="score">{score}</div>
    </div>
  )
}
