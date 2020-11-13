import React from 'react'
import {
  useParams
} from 'react-router-dom'

const UserPage = ( { users }) => {
  const id = useParams().id
  const correctUser = users.find(user => user.id === id)
  if(!correctUser) {
    return null
  }
  console.log(correctUser)
  return (
    <div>
      <h2>{correctUser.name}</h2>
      <p><i>username: {correctUser.username}</i></p>
      <h5>Added blogs</h5>
      <ul>
        {correctUser.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
      </ul>
    </div>
  )
}

export default UserPage