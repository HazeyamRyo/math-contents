import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/GameSetting.jsx';



function TrigonometricRations() {
  return (
    <>
      <ButtonAppBar />
      <GameSettings />
      <HomeButton />
      
    </>
  )
}

export { TrigonometricRations } ;