import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/GameSetting-applicationOfTrigonometricRatios.jsx'; //アプリの中身をインポート


function ApplicationOfTrigonometricRatios() {
  return (
    <>
      <ButtonAppBar />
      <GameSettings
      title = {"三角比の値を利用して角の大きさを求めよう"} 
      goal = {"三角比の値から角度から求めることができる。"}
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

export { ApplicationOfTrigonometricRatios } ;