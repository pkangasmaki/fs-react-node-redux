import React from 'react'

const Notification = ({message}) => {

    let errorStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
      }

    if (message === null) {
        return null
    }
    else if (message.includes("Added")) {
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
    else if (message.includes("Deleted")) {
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
    else if (message.includes("Changed")) {
        errorStyle = {
            color: 'black',
            backGround: 'lightGrey',
            fontStyle: 'italic',
            fontSize: 20,
            borderStyle: 'solid',
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
          }
    }
    else if (message.includes("Information")) {
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
            {message}
        </div>
    )
}

export default Notification