const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Matti-Juhanin seikkailut',
    author: 'Joonatan Sievinen',
    url: 'tosimies',
    likes: 200
  },
  {
    title: 'Hirvipaistin salat',
    author: 'Lasse Sievinen',
    url: 'Ruokaa piste fi',
    likes: 10
  },
  {
    title: 'Nyrkkeilyn tietotaito',
    author: 'Jiri Viitamäki',
    url: 'nyrkitheiluu com',
    likes: 32
  }
]

const initialUsers = [
  {
    username: 'Joonatan',
    name: 'Joonatan Sievinen',
    password: 'Joonatan'
  },
  {
    username: 'Lasse',
    name: 'Lasse Sievinen',
    password: 'Lasse'
  },
  {
    username: 'Jiri',
    name: 'Jiri Viitamäki',
    password: 'Jiri'
  }
]

describe('initial check', () => {
  beforeEach(async () => {

    //Initial installations for blogs
    await Blog.deleteMany({})

    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()

    blogObject = new Blog(initialBlogs[2])
    await blogObject.save()

    //Initial installations for users
    await User.deleteMany({})

    let userObject = new User(initialUsers[0])
    await userObject.save()

    userObject = new User(initialUsers[1])
    await userObject.save()

    userObject = new User(initialUsers[2])
    await userObject.save()
  })

  test('returns the right amount of blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(initialBlogs.length)
  })

  test('returns the right amount of users', async () => {
    const response = await api.get('/api/users')

    expect(response.body).toHaveLength(initialUsers.length)
  })

  test('blogs have id instead of _id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBe(undefined)
  })

  describe('adding a new blog post', () => {

    test('adding a blog without authorization ends with 401 unauthorized', async () => {

      const users = await User.find({})

      const newBlog = {
        title: 'Ismon aamut',
        author: 'Kalle Laitela',
        url: 'makkaraleipa.fi',
        likes: 6,
        user: users[0]._id
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    test('adding a blog when logged in succeeds with status code 201', async () => {

      const users = await User.find({})

      const newBlog = {
        title: 'Ismon aamut',
        author: 'Kalle Laitela',
        url: 'makkaraleipa.fi',
        likes: 6,
        user: users[0]._id
      }

      //tokenCreator returns log-in token for user[0] -> Joonatan
      const bearerToken = await helper.tokenCreator()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', bearerToken)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const titles = response.body.map(res => res.title)

      //Length grows by one after add
      expect(response.body.length).toBe(initialBlogs.length+1)

      //New blog is in the list
      expect(titles).toContain(
        'Ismon aamut'
      )
    })

    test('adding a new blog without likes will set likes to 0', async () => {

      const users = await User.find({})

      const newBlog = {
        title: 'I do not have likes',
        author: 'Likeman',
        url: 'like.like',
        user: users[0]._id
      }

      const bearerToken = await helper.tokenCreator()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', bearerToken)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')

      const titles = response.body.map(res => res.title)

      const latestBlog = response.body[response.body.length-1]

      expect(response.body.length).toBe(initialBlogs.length+1)
      expect(titles).toContain('I do not have likes')
      expect(latestBlog.likes).toBe(0)
    })

    test('fails with status code 400 if title does not exist', async () => {

      const users = await User.find({})

      //Create blog without title
      const newBlog = {
        author: 'Titleman',
        url: 'title.title',
        likes: 2,
        user: users[0]._id
      }

      const bearerToken = await helper.tokenCreator()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', bearerToken)
        .expect(400)

      //Check if blog was not added
      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(initialBlogs.length)
    })

    test('fails with status code 400 if url does not exist', async () => {

      const users = await User.find({})

      //Create blog without url
      const newBlog = {
        title: 'No URL',
        author: 'Urlman',
        likes: 2,
        user: users[0]._id
      }

      const bearerToken = await helper.tokenCreator()

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', bearerToken)
        .expect(400)

      //Check if blog was not added
      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(initialBlogs.length)
    })
  })


  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if deleted id is valid', async () => {

      const users = await User.find({})

      const blogToDelete = new Blog({
        title: 'This will be deleted',
        author: 'Joonatan Sievinen',
        url: 'joonatan.fi',
        likes: 60,
        user: users[0]._id
      })

      await blogToDelete.save()

      const bearerToken = await helper.tokenCreator()

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', bearerToken)
        .expect(204)

      const response = await api.get('/api/blogs')

      //Check if one blog got deleted
      //There was new blog added to initialBlogs
      //expected length should be initialblogs + 1 - 1
      expect(response.body.length).toBe(initialBlogs.length)

      //Check if you can find the deleted blog
      const ids = response.body.map(r => r.id)

      expect(ids).not.toContain(blogToDelete.id)
    })
  })
  describe('updating a blog', () => {
    test('updating results in new values successfully', async () => {
      const blogsAtStart = await api.get('/api/blogs')

      const blogToEdit = blogsAtStart.body[0]

      const newContent = {
        likes: 10000
      }

      await api
        .put(`/api/blogs/${blogToEdit.id}`)
        .send(newContent)

      const blogsAtEnd = await api.get('/api/blogs')

      expect(blogsAtEnd.body[0].likes).toBe(newContent.likes)
    })
  })
  describe('adding a new user', () => {
    test('add an user that passes validation with status code 200', async () => {
      const usersAtStart = await api.get('/api/users')

      const newUser = {
        username: 'Succesfull user',
        name: 'Ossi Puolakka',
        password: 'Salaisuus'
      }

      await api
        .post('/api/users')
        .send(newUser)

      const usersAtEnd = await api.get('/api/users')
      expect(usersAtStart.body.length + 1).toBe(usersAtEnd.body.length)
      expect(usersAtEnd.body[usersAtEnd.body.length-1].username).toBe(newUser.username)
    })

    test('add with invalid inputs, expect 400', async () => {
      const usersAtStart = await api.get('/api/users')

      const userNameFails = {
        username: 'Ta',
        name: 'Taneli Korpela',
        password: 'Taneli'
      }

      const passwordFails = {
        username: 'Matti Juhani',
        name: 'Matti Juhani',
        password: 'Ma'
      }

      await api
        .post('/api/users')
        .send(userNameFails)
        .expect(400)

      await api
        .post('/api/users')
        .send(passwordFails)
        .expect(400)

      const usersAtEnd = await api.get('/api/users')

      expect(usersAtStart.body.length).toBe(usersAtEnd.body.length)
    })

    test('add with missing inputs, expect 400', async () => {
      const usersAtStart = await api.get('/api/users')

      const noUserName = {
        name: 'Failaan',
        password: 'Failaan'
      }

      const noPassword = {
        username: 'Failaan myos',
        name: 'Failaan myos'
      }

      await api
        .post('/api/users')
        .send(noUserName)
        .expect(400)

      await api
        .post('/api/users')
        .send(noPassword)
        .expect(400)

      const usersAtEnd = await api.get('/api/users')

      expect(usersAtStart.body.length).toBe(usersAtEnd.body.length)
    })
  })
})


afterAll(() => {
  mongoose.connection.close()
})
