import { useUserContext } from '../context/userContext'

export default function Mypictures ({ pictures, setPictures }) {
  const { user } = useUserContext()

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
  const handleDelete = event => {
    event.preventDefault()
    const postBody = {
      id: event.target.dataset.pictureId
    }
    setPictures(postBody, 'delete')
  }

  return (
    <div
      id='gallery'
      className={
        pictures.filter(pic => user && pic.user.id === user.providerData[0].uid)
          .length < 4
          ? `grid-${
              pictures.filter(
                pic => user && pic.user.id === user.providerData[0].uid
              ).length
            }`
          : 'grid'
      }
    >
      {pictures.length > 0 &&
        pictures
          .filter(pic => user && pic.user.id === user.providerData[0].uid)
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
                    />
                    <button data-picture-id={pic.id} onClick={handleDelete}>
                      Delete
                    </button>
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
