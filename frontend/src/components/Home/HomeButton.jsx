import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import './HomeButton.css'

const HomeButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <div className='HomeButton'>
    <Button variant="contained" color="primary" onClick={handleClick}>
      トップ画面に戻る
    </Button>
    </div>
  )
}

export { HomeButton }