const initialState = { avatar: require('../../Images/user-picture.png')}

function setAvatar(state = initialState, action) {
  let nextState
  switch (action.type) {
    case 'SET_AVATAR':
      nextState = {
        ...state,
        avatar: action.value
      }
      return nextState
    default:
      return state
  }
}

export default setAvatar;