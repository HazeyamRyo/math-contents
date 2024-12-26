import React from 'react'
import { Difficulty } from './Difficulty'
import { Goal } from './Goal'
import { NumberOfQuestions } from './NumberOfQuestions'
import { Timer } from './Timer'

export const Header = (props) => {
  
  
  
    return (
    <header className="header">
        <NumberOfQuestions score={props.score}  />
        <Difficulty  difficulty={props.difficulty}/>
        <Goal  goal={props.goal}/>
        <Timer timer={props.timer}/>
    </header>
  )
}
