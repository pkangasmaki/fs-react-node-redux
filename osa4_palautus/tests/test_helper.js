const jwt = require('jsonwebtoken')
const User = require('../models/user')

//tokenCreator returns log-in token for user[0] -> Joonatan
//Ja tänne sit: const tokenCreator = async (user) => {
//Ja käytä useria sit tossa signauksessa
const tokenCreator = async () => {
  const users = await User.find({})
  const userForToken = {
    username: users[0].username,
    id: users[0]._id
  }

  //Create token for "logged in" user
  const token = jwt.sign(userForToken, process.env.SECRET)
  return 'bearer ' + token
}

module.exports = {
  tokenCreator
}