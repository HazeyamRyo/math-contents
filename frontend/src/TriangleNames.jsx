import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/GameSetting.jsx';
import './App.css'

function TriangleNames() {
  return (
    <div className='Container'>
      <ButtonAppBar />
      <GameSettings />
      <HomeButton />
    </div>
  )
}

export { TriangleNames } ;