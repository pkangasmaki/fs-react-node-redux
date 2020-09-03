import React from 'react'

const Button = ({handleDelete, id}) => {
    return (
        <button onClick={()=> handleDelete(id)}>delete</button>
    )
}

export default Button