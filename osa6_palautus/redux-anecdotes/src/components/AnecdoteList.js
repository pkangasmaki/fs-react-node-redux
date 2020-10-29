import React from 'react'
import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

  const vote = async (id) => {
    const votedAnecdote = props.anecdotes.find(e => e.id === id)
    props.addVote(votedAnecdote)
    props.setNotification(`you voted '${votedAnecdote.content}'`, 5)
  }

  const sortAnecdotes = (anecdotes) => {
    const sortedAnecdotes = anecdotes.sort((a,b) => (a.votes < b.votes) ? 1 : -1)
    return sortedAnecdotes
  }

  return (
    <div>
      {sortAnecdotes(props.anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  const filteredAnecdotes = []

  for (let i = 0; i < state.anecdotes.length; i++) {
    if((state.anecdotes[i].content).includes(state.filter)) {
      filteredAnecdotes.push(state.anecdotes[i])
    }
  }
  return {
    anecdotes: filteredAnecdotes
  }
}

const mapDispatchToProps = {
  addVote,
  setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)
export default ConnectedAnecdoteList