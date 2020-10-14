import axios from 'axios'
const baseUrl = '/api/users'

const userId = async (user) => {
  const users = await axios.get(baseUrl)

  var filteredUser = users.data.filter(obj => {
    return obj.username === user.username
  })

  const requiredUserId = filteredUser[0].id
  return requiredUserId
}

export default { userId }