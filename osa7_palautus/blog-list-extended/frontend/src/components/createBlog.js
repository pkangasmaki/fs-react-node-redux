import React, { useState } from 'react'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const CreateBlog = ({ handleCreateBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const submitNote = (e) => {
    e.preventDefault()

    handleCreateBlog(title, author, url)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h5>Create a new blog</h5>
      <Form onSubmit={submitNote}>
        <Form.Group>
          <Form.Control
            placeholder="title"
            type="text"
            id="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            placeholder="author"
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Control
            placeholder="url"
            type="text"
            id="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button variant={'outline-info'} id="create" type="submit">create</Button>
      </Form>
    </div>
  )}

export default CreateBlog