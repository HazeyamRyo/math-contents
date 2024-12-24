import React from 'react'
import { SignInButton } from './SignInButton.jsx'
import { SignOutButton } from './SignOutButton.jsx'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth , provider  } from '../../../firebase.js';
import './Login.css'


function Login() {
    const [user] = useAuthState(auth);
    if (user) {
        return (
            <div className='User'>
                <img className='User-img' src={user.photoURL} alt="User Avatar" />
                <SignOutButton />
            </div>
        )
    }
  
    
    return (
    <div>
        <SignInButton />
    </div>
  )
}

export {Login} ;