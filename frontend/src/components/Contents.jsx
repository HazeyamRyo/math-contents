import React from 'react'
import { List } from './List.jsx'
import './Contents.css'

export const Contents = () => {
  return (
    <div className='container'>
      <h1>コンテンツ一覧</h1>
      <List 
        title='★三角比の値を求める' 
        items={[
          {link: 'https://cds.chart.co.jp/books/abn5kpno2j/lessons/403', text: '相似な直角三角形の三角比を考察しよう'},
          {link: '/triangle-names', text: '三角形の辺の名前を覚えよう'},
          {link: '/trigonometric-rations', text: '三角比の値を辺の長さから求める'},
          {link: '/trigonometric-rations-part2', text: '三角比の値を角度から求める'}
        ]}
      />
    </div>
  )
}