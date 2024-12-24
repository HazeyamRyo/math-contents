import React from 'react'
import { ButtonAppBar } from './components/ButtonAppBar.jsx'
import { HomeButton } from './components/HomeButton.jsx';

function TriangleNames() {
  return (
    <>
      <ButtonAppBar />
      <div>
        <h1>三角形の辺の名前を覚えよう</h1>
        {/* ここにコンテンツを追加 */}
      </div>
      <HomeButton />
    </>
  )
}

export { TriangleNames } ;