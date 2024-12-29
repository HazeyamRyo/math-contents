import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/GameSetting.jsx';



function TrigonometricRations() {
  return (
    <>
      <ButtonAppBar />
      <GameSettings 
      title = {"三角比を辺の長さから求めよう"} 
      goal = {"三角比を辺の長さから求めることができる。"}
      maxQuestions = {9}
      timeAttackModeHas = {5}
      />
      <HomeButton />
    
    </>
  )
}

export { TrigonometricRations } ;