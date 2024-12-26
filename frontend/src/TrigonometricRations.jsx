import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/GameSetting.jsx';



function TrigonometricRations() {
  return (
    <>
      <ButtonAppBar />
      <h2 className='Title'>三角比を辺の長さから求めよう</h2>
      <GameSettings />
      <HomeButton />
    
    </>
  )
}

export { TrigonometricRations } ;