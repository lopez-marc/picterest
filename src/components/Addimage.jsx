import { useRef } from 'react'

export default function Addimage ({
  setPictures,
  user,
  addImageIsHidden,
  setAddImageIsHidden
}) {
  const urlRef = useRef()
  const descriptionRef = useRef()

  const onSubmit = e => {
    e.preventDefault()
    const url = urlRef.current.value
    const description = descriptionRef.current.value
    const postBody = {
      id: Math.random()
        .toString(36)
        .slice(2),
      urls: {
        small: url
      },
      description: description,
      user: {
        profile_image: {
          small: `${user.providerData[0].photoURL}&s=32`
        },
        id: user.providerData[0].uid
      },
      likes: 0,
      liked_by_user: false
    }
    if (url && description) setPictures(postBody, 'post')
    setAddImageIsHidden(true)
  }

  return (
    <div id='add-image' style={addImageIsHidden ? { display: 'none' } : null}>
      <form onSubmit={onSubmit}>
        <input placeholder='Url' type='text' ref={urlRef} />
        <input placeholder='Description' type='text' ref={descriptionRef} />
        <button type='submit'>Send</button>
      </form>
    </div>
  )
}
