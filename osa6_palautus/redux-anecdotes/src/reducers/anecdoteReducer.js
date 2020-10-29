import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch(action.type) {
    case 'VOTE':
      const id = action.data.id
      const newState = state.map(element => element.id !== id ? element : action.data)
      return newState
    case 'ADD_NEW':
      return [...state, action.data]
    case 'INITIALIZE':
        return action.data
    default:
      return state
  }
}

export const initializeDb = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALIZE',
      data: anecdotes
    })
  }
}

export const addVote = (votedAnecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateVote(votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_NEW',
      data: newAnecdote
    })
  }
}

export default reducer