import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import CreateBlog from './components/createBlog'
import Notification from './components/Notification'
import Userlist from './components/Userlist'
import Togglable from './components/Togglable'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'

import blogService from './services/blogs'
import loginService from './services/login'
import userServices from './services/user'

import './App.css'

import { useDispatch } from 'react-redux'
import { newNotification } from './reducers/notificationReducer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

import Table from 'react-bootstrap/Table'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [userlist, setUserlist] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    userServices.userList().then(users => {
      setUserlist( users )
    })
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

      //Redux
      dispatch(newNotification(`Logged in succesfully, welcome ${user.name}`))
      setTimeout(() => {
        dispatch(newNotification(''))
      }, 4000)

    } catch (err) {
      dispatch(newNotification('Wrong credentials'))
      setTimeout(() => {
        dispatch(newNotification(''))
      }, 4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)

    //Redux
    dispatch(newNotification('Logged out succesfully'))
    setTimeout(() => {
      dispatch(newNotification(''))
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

      //Redux
      dispatch(newNotification(`Adding a new blog "${newBlog.title}" successful`))
      setTimeout(() => {
        dispatch(newNotification(''))
      }, 4000)
    }
    catch (err) {
      dispatch(newNotification('Error adding a blog, check your input values'))
      setTimeout(() => {
        dispatch(newNotification(''))
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
    <Router>
      <div>
        {!user &&
          <Login handleLogin={handleLogin} password={password} username={username} setPassword={setPassword} setUsername={setUsername} />
        }
        {user &&
          <div>
            <div>
              <nav>
                <table className="nav-table">
                  <tbody>
                    <tr >
                      <td>
                        <Link to="/"> Blogs </Link>
                      </td>
                      <td>
                        <Link to="/users"> Users </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </nav>
            </div>
            <Switch>
              <Route path="/users/:id">
                <UserPage users={userlist} />
              </Route>
              <Route path="/users">
                <h2>Users</h2>
                <Logout name={user.name} handleLogout={handleLogout}/>
                <Userlist users={userlist}/>
              </Route>
              <Route path="/blogs/:id">
                <BlogPage handleLike={handleLike} blogs={blogs}/>
              </Route>
              <Route path="/">
                <h2>Blog-app</h2>
                <Notification/>
                <Logout name={user.name} handleLogout={handleLogout}/>

                <Togglable buttonLabel="Add a new blog" ref={blogFormRef}>
                  <CreateBlog handleCreateBlog={handleCreateBlog}/>
                </Togglable>

                <br></br>
                <Table striped bordered hover size="sm">
                  <thead>
                    {sortBlogs(blogs).map(blog =>
                      <tr key={blog.id}><td key={blog.id}><Blog key={blog.id} blog={blog} setBlogs={setBlogs} handleLike={() => handleLike(blog)} /> </td></tr>)}
                  </thead>
                </Table>
              </Route>
            </Switch>
          </div>
        }
      </div>
    </Router>
  )
}

export default App