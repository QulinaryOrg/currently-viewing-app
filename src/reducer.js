import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'

const initialState = {current_user: null}
const main = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_VISIT':
      return { current_user: action.result }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  firebase,
  main
})

export default rootReducer
