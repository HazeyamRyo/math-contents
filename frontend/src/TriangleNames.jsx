import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/GameSetting.jsx';
import './App.css'

function TriangleNames() {
  return (
    <div className='Container'>
      <ButtonAppBar />
      <h2 className='Title'>三角形の辺の名前を覚えよう</h2>
      <GameSettings />
      <HomeButton />
    </div>
  )
}

export { TriangleNames } ;