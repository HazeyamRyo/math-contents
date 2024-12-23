import React from 'react'
import { SignInButton } from './SignInButton.jsx'
import { SignOutButton } from './SignOutButton.jsx'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth , provider  } from '../../firebase.js';




function Login() {
    const [user] = useAuthState(auth);
    if (user) {
        return (
            <div>
                <h1>Welcome {user.displayName}</h1>
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