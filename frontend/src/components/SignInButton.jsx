import React from 'react'
import { auth , provider  } from '../../firebase.js';
import { signInWithPopup } from 'firebase/auth';
import '../App.css'

const SignInButton = () => {
    const SignInGoogle = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
    }
 
    return (
    <button className='Login-btn' onClick={SignInGoogle}>ログインする</button>
  )
}

export { SignInButton } 