import React from 'react'

export const Difficulty = ({difficulty}) => {
  return (
    <div className="difficulty">
    <div id="difficultyText">難易度</div>
    <div id="difficulty">{difficulty}</div>
    </div>
  )
}
