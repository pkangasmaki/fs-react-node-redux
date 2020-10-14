import React from 'react'
import PropTypes from 'prop-types'
import ErrorMessage from './ErrorMessage'

const Login = ({ handleLogin, password, username, setUsername, setPassword, notification }) => (
  <div>
    <h2 onSubmit={handleLogin}> log in to application</h2>
    <ErrorMessage notification={notification} />
    <form onSubmit={handleLogin}>
      <div>
      username
        <input
          id='username'
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
      password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type ="submit"> login </button>
    </form>
  </div>
)

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  notification: PropTypes.string.isRequired,
}

export default Login