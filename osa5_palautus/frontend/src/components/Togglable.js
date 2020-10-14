import React, { useState, useImperativeHandle  } from 'react'

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
        <button id="add-note" onClick={changeVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={createVisible}>
        {props.children}
        <button onClick={changeVisibility}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'


export default Togglable