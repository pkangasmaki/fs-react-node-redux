import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (newBlog, token) => {
  const bearerToken = `bearer ${token}`
  const config = {
    headers: { Authorization: bearerToken }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (updatedBlog, blogId, token) => {
  const bearerToken = `bearer ${token}`
  const config = {
    headers: { Authorization: bearerToken }
  }
  await axios.put(`${baseUrl}/${blogId}`, updatedBlog, config)
}

const deleteBlog = async (blogId, token) => {
  const bearerToken = `bearer ${token}`
  const config = {
    headers: { Authorization: bearerToken }
  }
  await axios.delete(`${baseUrl}/${blogId}`, config)
}

export default { getAll, createNew, update, deleteBlog }