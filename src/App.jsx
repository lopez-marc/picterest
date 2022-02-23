import { Routes, Route, BrowserRouter } from 'react-router-dom'
import useLocalStorage from './hooks/useLocalStorage.jsx'

import './App.css'

import pictures from './exported_pictures.json'
import Navbar from './components/Navbar'

import Allpictures from './views/Allpictures.jsx'
import Mypictures from './views/Mypictures.jsx'
console.log(pictures)

function App () {
  const [listOfPictures, setListOfPictures] = useLocalStorage(
    'pictures',
    pictures
  )

  return (
    <BrowserRouter basename='/picterest'>
      <div className='App'>
        <Navbar setPictures={setListOfPictures} />

        <Routes>
          <Route
            path='/'
            element={
              <Allpictures
                pictures={listOfPictures}
                setPictures={setListOfPictures}
              />
            }
          />
          <Route
            path='/my-pictures'
            element={
              <Mypictures
                pictures={listOfPictures}
                setPictures={setListOfPictures}
              />
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
