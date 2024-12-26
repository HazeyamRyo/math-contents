import React from 'react'

export const Goal = ({goal}) => {
  return (
    <div className="goal">
        <p className="goal-title">目標</p> 
        <p className="goal-text">{goal}</p>
    </div>
  )
}
