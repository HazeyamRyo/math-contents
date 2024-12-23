import React from 'react'
import '../App.css'

export const List = (props) => {
  return (
    <div className='contents'>
      <ul> <p>{props.title}</p>
        {props.items.map((item, index) => (
          <li key={index}>
            <a href={item.link} alt={item.text}>{item.text}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}

