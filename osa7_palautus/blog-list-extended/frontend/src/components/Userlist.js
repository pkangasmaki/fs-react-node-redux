import React from 'react'
import User from './User'

const Userlist = (userlist) => {
  const users = userlist.users

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <th>Username</th>
            <th>Blogs created</th>
          </tr>
          {users.map(user => <User key={user.id} user={user} blogs={user.blogs.length}/>)}
        </tbody>
      </table>
    </div>
  )
}



export default Userlist