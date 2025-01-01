import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/GameSetting-applicationOfTrigonometricRatios.jsx'; //アプリの中身をインポート


function ApplicationOfTrigonometricRatios() {
  return (
    <>
      <ButtonAppBar />
      <GameSettings
      title = {"三角比の値を角度から求めよう"} 
      goal = {"三角比を角度から求めることができる。"}
      maxQuestions = {9}
      timeAttackModeHas = {5}
      hintImg = {"../../../public/question-img/ヒント/triangle4.png"}/>
      <HomeButton />
    </>
  )
}

export { ApplicationOfTrigonometricRatios } ;