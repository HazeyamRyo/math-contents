import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/GameSetting-trigonometricRations2.jsx'; //アプリの中身をインポート


function TrigonometricRationsPart2() {
  return (
    <>
      <ButtonAppBar />
      <h2 className='Title'>三角比の値を角度から求めよう</h2>
      <GameSettings
      title = {"三角比の値を角度から求めよう"} 
      goal = {"三角比を角度から求めることができる。"}
      maxQuestions = {9}
      timeAttackModeHas = {1}
      hintImg = {"../../../public/question-img/ヒント/fft23.jpg"}/>
      <HomeButton />
    </>
  )
}

export { TrigonometricRationsPart2 } ;