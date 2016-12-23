import { GET_STARTED, SET_IP_LIST } from '../actions'
import { WELCOME_TEXT } from '../constants'

function rootReducer (state = {}, action) {
  switch (action.type) {
    case GET_STARTED:
      return { welcomeText: WELCOME_TEXT }
    case SET_IP_LIST:
      return { ipList: action.payload }
    default:
      return state
  }
}

export default rootReducer
