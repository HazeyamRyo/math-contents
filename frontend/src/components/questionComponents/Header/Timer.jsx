import React from 'react'

export const Timer = ({timer}) => {
  return (
    <div className="timer">
        <div id="timerText">time</div>
        <div id="timer">{timer}秒</div>
    </div>
  )
}
