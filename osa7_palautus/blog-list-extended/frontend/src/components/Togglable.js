import React, { useState, useImperativeHandle  } from 'react'
import Button from 'react-bootstrap/Button'

const Togglable = React.forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState(false)

  const createInvisible = { display: visibility ? 'none' : '' }
  const createVisible = { display: visibility ? '' : 'none' }

  const changeVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(ref, () => {
    return {
      changeVisibility
    }
  })

  return (
    <div>
      <div style={createInvisible}>
        <Button variant={'info'} id="add-blog" onClick={changeVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={createVisible}>
        {props.children}
        &nbsp;&nbsp;<Button variant={'outline-danger'} onClick={changeVisibility}> cancel</Button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'


export default Togglable