import React from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'

import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

import './Login.css'

const Login = ({ handleLogin, password, username, setUsername, setPassword }) => (
  <Form onSubmit={handleLogin}>
    <h2> log in to application</h2>
    <Notification />
    <Form.Label>Email address</Form.Label>
    <Form.Control
      id='username'
      type="text"
      value={username}
      name="Username"
      onChange={({ target }) => setUsername(target.value)}
    />
    <div>
      <Form.Label>Password</Form.Label>
      <Form.Control
        id='password'
        type="password"
        value={password}
        name="Password"
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>
    <br />
    <Button variant="primary" id="login-button" type ="submit"> login </Button>
  </Form>
)

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default Login