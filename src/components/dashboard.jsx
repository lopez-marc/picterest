import React from 'react'
import { useUserContext } from '../context/userContext'

const Dashboard = () => {
  const { user, logoutUser } = useUserContext()

  return (
    <div className='auth'>
      {/* <h1>Dashboard</h1>
      {user.photoURL && <img src={`${user.photoURL}&s=32`} />}
      <h2>Name : {user.displayName}</h2>
      <h2>Email : {user.email}</h2> */}
      <button onClick={logoutUser}>Log out</button>
    </div>
  )
}

export default Dashboard
