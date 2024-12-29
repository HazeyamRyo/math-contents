import React from 'react'
import { Difficulty } from './Difficulty'
import { Goal } from './Goal'
import { NumberOfQuestions } from './NumberOfQuestions'
import { Timer } from './Timer'
import "./Header.css"

export const Header = (props) => {
  console.log(props)
  
  
    return (
    <header className="header">
        <NumberOfQuestions score={props.score}  />
        <Difficulty  difficulty={props.difficulty}/>
        <Goal  goal={props.goal}/>
        <Timer isTimeAttackMode = {props.isTimeAttackMode} timer={props.timer}/>
    </header>
  )
}
