import React from 'react'

const Button = ({country, handleShowButton}) => {
    return (
      <button onClick={() => handleShowButton(country)}>show</button>
    )
  } 

export default Button