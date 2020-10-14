import React, { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog, setBlogs, setNotification, handleLike }) => {
  const [infoVisibility, setInfoVisibility] = useState(false)

  const changeVisibility = () => {
    setInfoVisibility(!infoVisibility)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleDelete = async () => {
    const message = `Are you sure you want to delete "${blog.title}"?`
    const deleteYes = window.confirm(message)
    if(deleteYes) {
      const user = window.localStorage.getItem('loggedInUser')
      const userToken = JSON.parse(user).token
      const blogId = blog.id
      try {
        await blogService.deleteBlog(blogId, userToken)
        const blogs = await blogService.getAll()
        setBlogs(blogs)
        setNotification(`Blog "${blog.title}" removed successfully`)
        setTimeout(() => {
          setNotification('')
        }, 4000)
      } catch (err) {
        console.log(err)
      }
    }
  }

  const compareUser = () => {
    const user = window.localStorage.getItem('loggedInUser')
    if(user) {
      const loggedUser = JSON.parse(user).username
      const userOfBlog = blog.user.username
      return loggedUser === userOfBlog
    }
  }

  const infoInvisible = { display: infoVisibility ? 'none' : '' }
  const infoVisible = { display: infoVisibility ? '' : 'none' }
  const deleteVisible = { display: compareUser() ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div>
      </div>
      <div style={infoInvisible} className='blogHeader'>
        {blog.title} <i>by {blog.author}</i> &nbsp;
        <button onClick={changeVisibility}>view</button>
      </div>
      <div style={infoVisible} className='infoBox'>
        <b>{blog.title}</b> <button onClick={changeVisibility}>hide</button>
        <div>{blog.url}</div>
        <div><i>likes: {blog.likes} <button onClick={handleLike}>like</button></i></div>
        <div>By: {blog.author}</div>
        <div style={deleteVisible}><button onClick={handleDelete}>remove</button></div>
      </div>
    </div>
  )}

export default Blog
