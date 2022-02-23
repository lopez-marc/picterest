import { Link, NavLink, Routes, Route } from 'react-router-dom'

import Auth from './auth'
import Dashboard from './dashboard'
import Addimage from './Addimage'

import { useUserContext } from '../context/userContext'
import { useState } from 'react'

export default function Navbar ({ setPictures }) {
  const { user, loading, error } = useUserContext()
  const [addImageIsHidden, setAddImageIsHidden] = useState(true)

  return (
    <>
      <header>
        <img
          id='NavLogo'
          src='https://cdn.freecodecamp.org/demo-projects/images/pinterest-logo.png'
          alt=''
        />
        <nav>
          <ul>
            <li>
              <NavLink to='/'>All Pictures</NavLink>
            </li>
            {user ? (
              <>
                <li>
                  <NavLink to='/my-pictures'>My Pictures</NavLink>
                </li>
                <li>
                  <Link
                    to='#'
                    onClick={() => setAddImageIsHidden(!addImageIsHidden)}
                    className={addImageIsHidden ? 'isHidden' : 'active'}
                  >
                    Add Image
                  </Link>
                  <Addimage
                    addImageIsHidden={addImageIsHidden}
                    setAddImageIsHidden={setAddImageIsHidden}
                    setPictures={setPictures}
                    user={user}
                  />
                </li>
              </>
            ) : null}
          </ul>
          {error && <p className='error'>{error}</p>}
          {loading ? (
            <h2>Loading...</h2>
          ) : (
            <> {user ? <Dashboard /> : <Auth />} </>
          )}
        </nav>
      </header>
    </>
  )
}
