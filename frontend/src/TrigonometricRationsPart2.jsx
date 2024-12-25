import React from 'react'
import { ButtonAppBar } from './components/Home/ButtonAppBar.jsx'
import { HomeButton } from './components/Home/HomeButton.jsx';
import { GameSettings } from './components/GameSetting/GameSetting.jsx';



function TrigonometricRationsPart2() {
  return (
    <>
      <ButtonAppBar />
      <h2 className='Title'>三角比の値を角度から求めよう</h2>
      <GameSettings />
      <HomeButton />
    </>
  )
}

export { TrigonometricRationsPart2 } ;