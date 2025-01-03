import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/GameSetting-applicationOfTrigonometricRatios2.jsx'; //アプリの中身をインポート


function ApplicationOfTrigonometricRatios2() {
  return (
    <>
      <ButtonAppBar />
      <GameSettings
      title = {"三角比の値を利用して辺の長さを求めよう"} 
      goal = {"三角比の値から辺の長さを求めることができる。"}
      maxQuestions = {5}
      timeAttackModeHas = {3}
      hintImg = {import.meta.env.BASE_URL + "question-img/ヒント/三角形辺の名前.gif"}
      hintImg2 = {import.meta.env.BASE_URL + "question-img/ヒント/fft23.jpg"}
      hintImg3 = {import.meta.env.BASE_URL + "question-img/ヒント/triangle4.png"}
      hintImg4 = {import.meta.env.BASE_URL + "question-img/ヒント/三角比の表.webp"}

      />
      <HomeButton />
    </>
  )
}

export { ApplicationOfTrigonometricRatios2 } ;