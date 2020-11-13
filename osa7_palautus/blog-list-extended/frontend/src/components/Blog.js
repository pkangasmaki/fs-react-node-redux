import React, { useState } from 'react'
import blogService from '../services/blogs'

import { useDispatch } from 'react-redux'
import { newNotification } from '../reducers/notificationReducer'

import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom'

const Blog = ({ blog, setBlogs, handleLike }) => {
  const [infoVisibility, setInfoVisibility] = useState(false)

  const dispatch = useDispatch()

  const changeVisibility = () => {
    setInfoVisibility(!infoVisibility)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'none',
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
        dispatch(newNotification(`Blog "${blog.title}" removed successfully`))
        setTimeout(() => {
          dispatch(newNotification(''))
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
        <Link to={`/blogs/${blog.id}`}> {blog.title} </Link> <i>by {blog.author}</i> &nbsp;
        <Button variant="outline-primary" onClick={changeVisibility}>preview</Button>
      </div>
      <div style={infoVisible} className='infoBox'>
        <b>{blog.title}</b> <Button variant="outline-dark" onClick={changeVisibility}>hide</Button>
        <div>{blog.url}</div>
        <div><i>likes: {blog.likes} <Button variant="outline-success" onClick={handleLike}>like</Button></i></div>
        <div>By: {blog.author}</div>
        <div style={deleteVisible}><Button variant="outline-danger" onClick={handleDelete}>remove</Button></div>
      </div>
    </div>
  )}

export default Blog
