import React from 'react'
import { useSelector } from 'react-redux'

import Alert from 'react-bootstrap/Alert'

const ErrorMessage = () => {

  const notificationText = useSelector(state => state)
  let variant

  if (notificationText === '') {
    return null
  }
  else if (notificationText.includes('Adding a new blog')) {
    variant = 'success'
  }
  else if (notificationText.includes('Logged')) {
    variant = 'primary'
  }
  else {
    variant = 'danger'
  }

  return (
    <Alert variant={variant}>
      {notificationText}
    </Alert >
  )
}

export default ErrorMessage