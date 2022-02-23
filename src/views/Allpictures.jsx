import { useState } from 'react'
import { useUserContext } from '../context/userContext'

export default function Allpictures ({ pictures, setPictures }) {
  const [filterById, setFilterById] = useState(null)
  const { user } = useUserContext()

  const handleClick = event => {
    // setFilterById(id)
    setFilterById(event.target.dataset.userId)
  }

  const handleLike = event => {
    if (!user) return
    const liked_by_user = JSON.parse(event.target.dataset.liked) ? false : true
    const likes = JSON.parse(event.target.dataset.liked)
      ? Number(event.target.childNodes[1].data) - 1
      : Number(event.target.childNodes[1].data) + 1

    event.preventDefault()
    const postBody = {
      id: event.target.dataset.pictureId,
      liked_by_user,
      likes
    }
    setPictures(postBody, 'put')
  }

  const clearFilter = () => setFilterById(null)
  return (
    <div
      id='gallery'
      className={
        filterById !== null
          ? pictures.filter(pic => pic.user.id === filterById).length < 4
            ? `grid-${
                pictures.filter(pic => pic.user.id === filterById).length
              }`
            : 'grid'
          : 'grid'
      }
    >
      {filterById !== null ? (
        <button onClick={clearFilter}>Clear Filter</button>
      ) : null}
      {filterById !== null
        ? pictures.length > 0 &&
          pictures
            .filter(pic => pic.user.id === filterById)
            .map(pic => {
              return (
                <div className='grid-item'>
                  <img
                    src={pic.urls.small}
                    alt={pic.alt_description}
                    className='main-picture'
                  />
                  <caption>
                    <p>{pic.description || pic.alt_description}</p>
                    <div>
                      <img
                        src={pic.user.profile_image.small}
                        alt={pic.user.name}
                        data-user-id={pic.user.id}
                        onClick={handleClick}
                      />
                      <button
                        className={pic.liked_by_user ? 'liked' : null}
                        data-liked={pic.liked_by_user}
                        data-picture-id={pic.id}
                        onClick={handleLike}
                      >
                        &hearts;{pic.likes}
                      </button>
                    </div>
                  </caption>
                </div>
              )
            })
        : pictures.length > 0 &&
          pictures.map(pic => {
            return (
              <div className='grid-item'>
                <img
                  src={pic.urls.small}
                  alt={pic.alt_description}
                  className='main-picture'
                />
                <caption>
                  <p>{pic.description || pic.alt_description}</p>
                  <div>
                    <img
                      src={pic.user.profile_image.small}
                      alt={pic.user.name}
                      data-user-id={pic.user.id}
                      onClick={handleClick}
                    />
                    <button
                      className={pic.liked_by_user ? 'liked' : null}
                      data-liked={pic.liked_by_user}
                      data-picture-id={pic.id}
                      onClick={handleLike}
                    >
                      &hearts;{pic.likes}
                    </button>
                  </div>
                </caption>
              </div>
            )
          })}
    </div>
  )
}
