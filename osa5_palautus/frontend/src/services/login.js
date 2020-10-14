import axios from 'axios'
const baseUrl = '/api/login'

//Login haluaa:
// {username: 'String', password: 'String'}
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }