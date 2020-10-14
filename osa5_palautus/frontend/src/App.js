import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlog from './components/createBlog'
import ErrorMessage from './components/ErrorMessage'
import blogService from './services/blogs'
import loginService from './services/login'
import userServices from './services/user'
import Togglable from './components/Togglable'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const user = window.localStorage.getItem('loggedInUser')
    if(user) {
      setUser(JSON.parse(user))
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password
    }
    try {
      //Returns = {Token, Username, Name}
      const user = await loginService.login(credentials)
      setUsername('')
      setPassword('')
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      setNotification(`Logged in succesfully, welcome ${user.name}`)
      setTimeout(() => {
        setNotification('')
      }, 4000)
    } catch (err) {
      setNotification('Wrong credentials')
      setTimeout(() => {
        setNotification('')
      }, 4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
    setNotification('Logged out successfully')
    setTimeout(() => {
      setNotification('')
    }, 4000)
  }

  const handleCreateBlog = async (title, author, url) => {
    try {
      //Parse userID and user token from logged in user
      const user = window.localStorage.getItem('loggedInUser')
      const userToken = JSON.parse(user).token
      const parsedId = await userServices.userId(JSON.parse(user))

      const newBlog = {
        title: title,
        author: author,
        url: url,
        user: parsedId
      }

      //Change visibility of creating a new note and POSTing note to server
      blogFormRef.current.changeVisibility()
      await blogService.createNew(newBlog, userToken)

      //Add new blog to bloglist state
      const blogs = await blogService.getAll()
      setBlogs(blogs)

      //Notification for adding a new blog
      setNotification(`Adding a new blog "${newBlog.title}" successful`)
      setTimeout(() => {
        setNotification('')
      }, 4000)
    }
    catch (err) {
      setNotification('Error adding a blog, check your input values')
      setTimeout(() => {
        setNotification('')
      }, 4000)
    }
  }

  const blogFormRef = useRef()

  const sortBlogs = (blogList) => {
    const sortedBlogs = blogList.sort((a,b) => (a.likes < b.likes) ? 1 : -1)
    return sortedBlogs
  }


  //Lisättiin
  const handleLike = async (blog) => {
    const user = window.localStorage.getItem('loggedInUser')
    const userToken = JSON.parse(user).token

    //Updated blog contains same info except likes +1
    const updatedBlog = {
      likes: Number(blog.likes)+1,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user
    }

    //Id for blog route
    const blogId = blog.id

    //PUT
    await blogService.update(updatedBlog, blogId, userToken)

    const blogs = await blogService.getAll()
    setBlogs(blogs)
  }

  return (
    <div>
      {!user &&
        <Login handleLogin={handleLogin} password={password} username={username} setPassword={setPassword} setUsername={setUsername} notification={notification} />
      }

      {user &&
        <div>
          <div>
            <h2>blogs</h2>
            <ErrorMessage notification={notification}/>
            <Logout name={user.name} handleLogout={handleLogout}/>

            <Togglable buttonLabel="Add note" ref={blogFormRef}>
              <CreateBlog handleCreateBlog={handleCreateBlog}/>
            </Togglable>

            <br></br>
            <ul>
              {sortBlogs(blogs).map(blog =>
                <li key=''><Blog setNotification={setNotification} key={blog.id} blog={blog} setBlogs={setBlogs} handleLike={() => handleLike(blog)} /> </li>)}
            </ul>
          </div>
        </div>
      }

    </div>
  )
}

export default App