import React from 'react'
import { auth , provider  } from '../../firebase.js';
import { signInWithPopup } from 'firebase/auth';


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
    <button onClick={SignInGoogle}>Sign In</button>
  )
}

export { SignInButton } 