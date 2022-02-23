import { useState } from 'react'

export default function useLocalStorage (key, initialValue) {
  console.log(initialValue)
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      return initialValue
    }
  })

  const setValue = (value, method) => {
    console.log(value)
    console.log(method)
    if (method === 'post') {
      try {
        setStoredValue(oldArray => [value, ...oldArray])
        console.log(storedValue)
        window.localStorage.setItem(
          key,
          JSON.stringify([value, ...storedValue])
        )
      } catch (error) {
        console.error(error)
      }
    } else if (method === 'put') {
      const updatedArray = storedValue.map(element => {
        if (element.id == value.id) {
          return {
            ...element,
            liked_by_user: value.liked_by_user,
            likes: value.likes
          }
        }
        return element
      })

      setStoredValue(updatedArray)
      window.localStorage.setItem(key, JSON.stringify(updatedArray))
    } else if (method === 'delete') {
      const updatedArray = storedValue.filter(
        element => element.id !== value.id
      )

      console.log(updatedArray)

      setStoredValue(updatedArray)
      window.localStorage.setItem(key, JSON.stringify(updatedArray))
    } else if (method === 'logout') {
      storedValue.map(element => {
        return {
          ...element,
          liked_by_user: false
        }
      })
    }
  }

  return [storedValue, setValue]
}
