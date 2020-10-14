import React from 'react'

const ErrorMessage = ( { notification } ) => {

  let errorStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  if (notification === '') {
    return null
  }
  else if (notification.includes('Adding a new blog')) {
    errorStyle = {
      color: 'green',
      backGround: 'lightGrey',
      fontStyle: 'italic',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  }
  else if (notification.includes('Logged')) {
    errorStyle = {
      color: 'blue',
      backGround: 'lightGrey',
      fontStyle: 'italic',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  }
  else {
    errorStyle = {
      color: 'red',
      backGround: 'lightGrey',
      fontStyle: 'italic',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10
    }
  }

  return (
    <div style={errorStyle}>
      {notification}
    </div>
  )
}

export default ErrorMessage