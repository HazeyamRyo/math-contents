import React from 'react'

export const Timer = ({isTimeAttackMode,timer}) => {
  
  if (isTimeAttackMode) {
  return (
    <div className="timer">
        <div id="timerText">time</div>
        <div id="timer">{timer.toFixed(1)}秒</div>
    </div>
  )
};
return null;
}
