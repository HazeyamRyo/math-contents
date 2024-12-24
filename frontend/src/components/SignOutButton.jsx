import React from 'react'
import { auth } from '../../firebase.js'
import { signOut } from 'firebase/auth'
import './SignOutButton.css'


// サインアウトを実装するコンポーネント
export const SignOutButton = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out')
      })
      .catch((error) => {
        console.error('Error signing out: ', error)
      })
  }

  return (
    <button className='Sign-out-btn' onClick={handleSignOut}>Sign Out</button>
  )
}
  
