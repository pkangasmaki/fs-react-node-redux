const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case('SET_NOTIFICATION'):
      return action.data.text
    default:
      return state
  }
}

let timer;

export const setNotification = (text, time) => {
  clearTimeout(timer)
  const delay = time*1000
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data: {
        text: text
      }
    })
    timer = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        data: {
          text: null
        }
      })
    }, delay)
  }
}

export default notificationReducer