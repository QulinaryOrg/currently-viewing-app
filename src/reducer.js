import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'

const initialState = {currentUser: null}
/**
 * Reducer for current user
 * @param  {Object} state - Current  redux state
 * @param  {object} action - Object containing the action that was dispatched
 * @param  {String} action.type - Type of action that was dispatched
 * @return {Object} current user state after reduction
 */
const main = (state = initialState, action) => {
  switch (action.type) {
    case 'USER_VISIT':
      return { currentUser: action.result }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  firebase,
  main
})

export default rootReducer
