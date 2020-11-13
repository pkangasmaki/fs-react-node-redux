import React from 'react'
import './User.css'

import { Link } from 'react-router-dom'

const User = ({ user, blogs }) => {
  return (
    <tr className='user-table'>
      <td className='user-table'>
        <Link to={`/users/${user.id}`}>{user.name}</Link></td>
      <td className='blog-table'>{blogs}</td>
    </tr>
  )
}

export default User