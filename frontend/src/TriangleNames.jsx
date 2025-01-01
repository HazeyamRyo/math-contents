import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/Gamesetting-triangleName.jsx';
import './App.css'

function TriangleNames() {
  return (
    <div className='Container'>
      <ButtonAppBar />
      <GameSettings 
        title = {"三角形の辺の名前を覚えよう"} 
        goal = {"三角形の辺の名前を答えることができる"}
        maxQuestions = {9}
        timeAttackModeHas = {5}
        hintImg = {import.meta.env.BASE_URL + "/question-img/ヒント/三角形辺の名前.gif"}
      />
      <HomeButton />
    </div>
  )
}

export { TriangleNames } ;