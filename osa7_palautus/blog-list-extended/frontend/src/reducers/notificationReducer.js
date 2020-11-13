const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return action.data.text
    default:
      return state
  }
}

export const newNotification = (text) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      text: text
    }
  }
}

export default reducer