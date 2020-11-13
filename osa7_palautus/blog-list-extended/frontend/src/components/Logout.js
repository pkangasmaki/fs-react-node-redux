import React from 'react'
import PropTypes from 'prop-types'
import Button from 'react-bootstrap/Button'
import './Logout.css'

const Logout = ({ name, handleLogout }) => {
  return (
    <div className="logged-in">
      {name} logged in&nbsp;
      <Button size="sm" variant={'outline-danger'} onClick={handleLogout}>Logout</Button>
    </div>
  )}

Logout.propTypes = {
  name: PropTypes.string.isRequired
}


export default Logout