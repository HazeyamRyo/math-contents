import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

const HomeButton = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/')
  }

  return (
    <Button variant="contained" color="primary" onClick={handleClick}>
      ホームに戻る
    </Button>
  )
}

export { HomeButton }