import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (data) => {
  const dataObject = {
    content: data,
    votes: 0
  }
  const response = await axios.post(baseUrl, dataObject)
  return response.data
}

const updateVote = async (anecdote) => {
  const updatedAnecdote = {
    ...anecdote,
    votes: anecdote.votes+1
  }
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, updatedAnecdote)
  return response.data
}

export default {
  getAll,
  createNew,
  updateVote
}