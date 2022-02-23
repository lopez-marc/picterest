import React, { useState } from 'react'
import { useUserContext } from '../context/userContext'
import Signin from './signin'
import Signup from './signup'

const Auth = () => {
  const { signInWithGithub } = useUserContext()

  return (
    <div className='auth'>
      <button onClick={signInWithGithub}> Signin with GitHub </button>
    </div>
  )
}

export default Auth
