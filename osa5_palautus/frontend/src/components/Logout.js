import React from 'react'
import PropTypes from 'prop-types'

const Logout = ({ name, handleLogout }) => {
  return (
    <div>
      {name} logged in
      <button onClick={handleLogout}>Logout</button>
    </div>
  )}

Logout.propTypes = {
  name: PropTypes.string.isRequired
}


export default Logout