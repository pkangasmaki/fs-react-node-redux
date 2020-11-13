import React from 'react'
import {
  useParams
} from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const BlogPage = ( { blogs, handleLike }) => {
  const id = useParams().id
  const correctBlog = blogs.find(blog => blog.id === id)
  if(!correctBlog) {
    return null
  }
  return (
    <div>
      <h1>{correctBlog.title}</h1>
      <a href={correctBlog.url}>{correctBlog.url}</a>
      <p>{correctBlog.likes} likes <Button variant="primary" onClick={() => handleLike(correctBlog)}>like</Button></p>
      <p><i>Added by {correctBlog.author}</i></p>
    </div>
  )
}

export default BlogPage