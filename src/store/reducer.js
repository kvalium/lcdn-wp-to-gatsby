const initialState = {
  isAuth: false,
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_AUTH":
      return { ...state, isAuth: action.status }
    default:
      return state
  }
}

export default authReducer
