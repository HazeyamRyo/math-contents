import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/GameSetting-trigonometricRations.jsx'; //アプリの中身をインポート



function TrigonometricRations() {
  return (
    <>
      <ButtonAppBar />
      <GameSettings 
      title = {"三角比を辺の長さから求めよう"} 
      goal = {"三角比を辺の長さから求めることができる。"}
      maxQuestions = {9}
      timeAttackModeHas = {1}
      hintImg = {"../../../public/question-img/ヒント/fft23.jpg"}
      />
      <HomeButton />
    
    </>
  )
}

export { TrigonometricRations } ;