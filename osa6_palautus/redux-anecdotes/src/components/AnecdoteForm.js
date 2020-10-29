import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  
  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdoteInput.value
    e.target.anecdoteInput.value = ''

    if(content) {
      props.createAnecdote(content)
      props.setNotification(`created '${content}'`, 5)
    }
    else {
      props.setNotification(`Content required`, 5)
    }
  }

  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={addAnecdote}>
      <div><input name="anecdoteInput" /></div>
      <button type="submit">create</button>
    </form>
    </div>
  )
}

export default connect(
  null,
  {
    createAnecdote,
    setNotification
  }
)(AnecdoteForm)