import React from 'react'
import './App.css'
import { ButtonAppBar } from './components/ButtonAppBar.jsx'
import { List } from './components/List.jsx'

function App() {
  return (
    <>
      <ButtonAppBar />
      <div className='container'>
      <h1>コンテンツ一覧</h1>
          <List 
          title='★三角比の値を求める' 
          items = {[
            {link: 'https://cds.chart.co.jp/books/abn5kpno2j/lessons/403', text: '相似な直角三角形の三角比を考察しよう'},
            {link: 'https://www.google.com/', text: '三角比の値を求める'},
            {link: 'https://www.google.com/', text: '三角比の値を求める'},
            {link: 'https://www.google.com/', text: '三角比の値を求める'}
          ]}
          />
      </div>
            

    </>
  )
}

export default App;