import React, { useState } from 'react'

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
      <h2>create new</h2>
      <form onSubmit={submitNote}>
        <div>
          title:
          <input
            type="text"
            id="title"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>

        <div>
          author:
          <input
            type="text"
            id="author"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>

        <div>
      url:
          <input
            type="text"
            id="url"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="create" type="submit">create</button>
      </form>
    </div>
  )}

export default CreateBlog