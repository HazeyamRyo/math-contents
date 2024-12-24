import React from 'react'
import { Link } from 'react-router-dom'
import './List.css'

export const List = (props) => {
  return (
    <div className='contents'>
      <ul> <p>{props.title}</p>
        {props.items.map((item, index) => (
          <li key={index}>
            <Link to={item.link}>{item.text}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}