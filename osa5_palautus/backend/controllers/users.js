const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const Users = await User
    .find({}).populate('blogs')
  response.json(Users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if(!body.password || !body.username) {
    return response.status(400).json({ error: 'username or password missing' })
  }

  if(body.password.length < 3 || body.username.length < 3) {
    return response.status(400).json({ error: 'username and password must have length over 3' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  response.json(savedUser)
})

module.exports = usersRouter